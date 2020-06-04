package it.css.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import it.css.util.Constants;

public class LogExternalCall {

	private static final Logger logger = LoggerFactory.getLogger(LogExternalCall.class);

	private LogExternalCall() {
	}

	public static void clientCall(String className, long startTime) {
		long end = System.currentTimeMillis();
		long diff = end - startTime;
		logger.info("{}| {} || {} || Duration: {} MILLISECONDS.", className, Constants.CLIENT_CALL, className, diff);
	}

	public static void dbCall(String className, long startTime) {
		long end = System.currentTimeMillis();
		long diff = end - startTime;
		logger.info("{}| {} || {} || Duration: {} MILLISECONDS.", className, Constants.DB_CALL, className, diff);
	}

}
