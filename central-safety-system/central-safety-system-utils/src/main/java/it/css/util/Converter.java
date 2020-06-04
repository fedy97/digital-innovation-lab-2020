package it.css.util;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Converter {

	protected Converter() {
	}

	public static Charset getCharset() {
		return StandardCharsets.UTF_8;
	}

	// byte to String
	public static String bytesToString(byte[] bs) {
		return new String(bs, getCharset());
	}

	// String to Byte
	public static byte[] stringToBytes(String in) {
		return in.getBytes(getCharset());
	}

}
