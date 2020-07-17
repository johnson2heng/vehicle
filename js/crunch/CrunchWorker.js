importScripts( "crn_decomp.js" );

RGB_S3TC_DXT1_Format 	= 0x83F0;
RGBA_S3TC_DXT1_Format 	= 0x83F1;
RGBA_S3TC_DXT3_Format 	= 0x83F2;
RGBA_S3TC_DXT5_Format 	= 0x83F3;

var isChrome = !! navigator.userAgent.match( /chrome/i );

function parseCRN( buffer, loadMipmaps, startOffset, byteLength ) {

	if ( startOffset === undefined ) startOffset = 0;
	if ( byteLength === undefined ) byteLength = buffer.byteLength;

	var dds = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };

	// Adapted from @toji's DDS utils
	//	https://github.com/toji/webgl-texture-utils/blob/master/texture-util/crunch.js
	// 	Module comes from Emscripten generated code in crn_decomp.js

	// Constants taken from crnlib.h

	var cCRNFmtInvalid = -1;

	var cCRNFmtDXT1 = 0;
	var cCRNFmtDXT3 = 1;
	var cCRNFmtDXT5 = 2;

	// Various DXT5 derivatives

	var cCRNFmtDXT5_CCxY = 3;    // Luma-chroma
	var cCRNFmtDXT5_xGxR = 4;    // Swizzled 2-component
	var cCRNFmtDXT5_xGBR = 5;    // Swizzled 3-component
	var cCRNFmtDXT5_AGBR = 6;    // Swizzled 4-component

	// ATI 3DC and X360 DXN

	var cCRNFmtDXN_XY = 7;
	var cCRNFmtDXN_YX = 8;

	// DXT5 alpha blocks only

	var cCRNFmtDXT5A = 9;

	//

	var arrayBufferCopy = function ( src, dst, dstByteOffset, numBytes ) {

		dst.set( src, dstByteOffset );

	};

	var bytes = new Uint8Array( buffer, startOffset, byteLength );

	var srcSize = byteLength;
	var src = Module._malloc( srcSize );

	arrayBufferCopy( bytes, Module.HEAPU8, src, srcSize );

	var internalFormat;
	var format = Module._crn_get_dxt_format( src, srcSize );

	switch ( format ) {

		case cCRNFmtDXT1:
			internalFormat = RGB_S3TC_DXT1_Format;
			break;

		case cCRNFmtDXT3:
			internalFormat = RGBA_S3TC_DXT3_Format;
			break;

		case cCRNFmtDXT5:
			internalFormat = RGBA_S3TC_DXT5_Format;
			break;

		default:
			//console.error( "ImageUtils.parseCRN(): Unsupported image format" );
			return 0;

	}

	var width = Module._crn_get_width( src, srcSize );
	var height = Module._crn_get_height( src, srcSize );
	var levels = Module._crn_get_levels( src, srcSize );

	dds.format = internalFormat;
	dds.width = width;
	dds.height = height;
	dds.mipmapCount = levels;

	var unpackAlignment = 4;

	var dstSize = Module._crn_get_uncompressed_size( src, srcSize, 0 );
	var dst = Module._malloc( dstSize );

	for ( var i = 0; i < levels; ++ i ) {

		if ( i ) {

			dstSize = Module._crn_get_uncompressed_size( src, srcSize, i );

		}

		Module._crn_decompress( src, srcSize, dst, dstSize, i );

		// must do copy of the temporary Emscripten heap buffer content
		// otherwise smaller mips will overwrite larger ones

		var bufferData = Module.HEAPU8.buffer.slice( dst, dst + dstSize );
		var dxtData = new Uint8Array( bufferData );

		var mipmap = { "data": dxtData, "width": width, "height": height, "unpackAlignment": unpackAlignment };
		dds.mipmaps.push( mipmap );

		width = Math.max( width * 0.5, 1 );
		height = Math.max( height * 0.5, 1 );

	}

	Module._free( src );
	Module._free( dst );

	return dds;

}

function parseMultipleCRNs( buffer, offsets ) {

	var textureList = [];

	for ( var i = 0, il = offsets.length; i < il; i ++ ) {

		var offsetInfo = offsets[ i ];

		var startOffset = offsetInfo[ 0 ];
		var byteLength  = offsetInfo[ 1 ];

		var loadMipmaps = true;

		var texture = parseCRN( buffer, loadMipmaps, startOffset, byteLength );
		textureList.push( texture );

	};

	return textureList;

}

function generateBufferList ( textureData ) {

	var bufferList = [];

	for ( var i = 0, il = textureData.length; i < il; i ++ ) {

		var texture = textureData[ i ];
		var mipmaps = texture.mipmaps;

		for ( var j = 0, jl = mipmaps.length; j < jl; j ++ ) {

			bufferList.push( mipmaps[ j ].data.buffer );

		}

	}

	return bufferList;

}

self.onmessage = function ( event ) {

	var data = event.data;

	var buffer = data.buffer;
	var offsets = data.offsets;

	var textureData = parseMultipleCRNs( buffer, offsets );

	// only Chrome supports sending multiple transferables from worker
	// mixed with regular JSON data

	if ( isChrome ) {

		var bufferList = generateBufferList( textureData );
		self.postMessage( { "textureData": textureData }, bufferList );

	} else {

		self.postMessage( { "textureData": textureData } );

	}

	self.close();

}
