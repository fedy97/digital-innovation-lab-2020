
package it.css.log;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;

public class CSSLogger {

    private static final Logger logger      = LoggerFactory.getLogger(CSSLogger.class);
    private static final Marker marker      = MarkerFactory.getMarker("FATAL");
    private static final String PLACEHOLDER = "{}|{}";

    private CSSLogger() {

    }

    public static void debug(String str, String className) {

        logger.debug(PLACEHOLDER, className, str);
    }

    public static void error(String str, String className) {

        logger.error(PLACEHOLDER, className, str);
    }

    public static void exception(Exception ex) {

        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
        String name = stackTrace[2].getFileName();
        int line = stackTrace[2].getLineNumber();
        StringBuilder builder = new StringBuilder();
        builder.append("Exception: ");
        if (ex.getCause() == null) {
            builder.append(ex.getMessage());
        } else {
            builder.append(ExceptionUtils.getStackTrace(ex.getCause()));
        }
        logger.error("{}:{}|{}", name, line, builder);
    }

    public static void info(String s, String className) {

        logger.info(PLACEHOLDER, className, s);
    }

    public static void fatal(String s, String className) {

        logger.error(marker, PLACEHOLDER, className, s);
    }

    public static void warning(String s, String className) {

        logger.warn(PLACEHOLDER, className, s);
    }

    public static void trace(String s, String className) {

        logger.trace(PLACEHOLDER, className, s);
    }
}
