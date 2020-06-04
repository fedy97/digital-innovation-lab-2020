
package it.css.log;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ObjectUtils;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class LoggingUtils extends HandlerInterceptorAdapter {

    private static final String CALL_CONTEXT = "callContext";
    private static final String SERVICE_NAME = "serviceName";
    private static final String METHOD_NAME  = "methodName";
    private static final String IP           = "ip";
    private static final String SESSION_ID   = "sessionId";
    private static final String APPICATION   = "application";
    private static final String CHANNEL      = "channel";
    private static final String LOCALE       = "locale";
    // log constants
    private static final String DBANK        = "DEUTSCHEBANK";
    private static final String IT           = "IT";
    private static final String APP          = "LEMIECARTE";
    private static final String CLASSNAME    = LoggingUtils.class.getSimpleName();
    @Value("${spring.application.name}")
    private String              serviceName;

    public void prepareLog(HttpServletRequest request, Object controller) {

        MDC.put(SERVICE_NAME, ObjectUtils.firstNonNull(serviceName, ""));
        MDC.put(CALL_CONTEXT, DBANK);
        MDC.put(APPICATION, APP);
        MDC.put(CHANNEL, "");
        MDC.put(LOCALE, IT);
        CSSLogger.trace("populating Mdc context...", CLASSNAME);
        String methodName = ((HandlerMethod) controller).getMethod().getName();
        CSSLogger.trace(new StringBuilder().append("The retrieved serviceName is..").append(serviceName).toString(),
                CLASSNAME);
        MDC.put(METHOD_NAME, ObjectUtils.firstNonNull(methodName, ""));
        MDC.put(IP, ObjectUtils.firstNonNull(request.getRemoteAddr(), ""));
        MDC.put(SESSION_ID, ObjectUtils.firstNonNull(request.getSession().getId(), ""));
        CSSLogger.trace("MDC context populated..", CLASSNAME);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object controller)
            throws Exception {

        prepareLog(request, controller);
        CSSLogger.info("[REQUEST][" + request.getMethod() + "]" + request.getRequestURI() + getParameters(request),
                CLASSNAME);
        long startTime = System.currentTimeMillis();
        request.setAttribute("startTime", startTime);
        return true;
    }

    public String getServiceName() {

        return serviceName;
    }

    public void setServiceName(String serviceName) {

        this.serviceName = serviceName;
    }

    private String getParameters(final HttpServletRequest request) {

        final StringBuilder posted = new StringBuilder();
        final Enumeration<?> e = request.getParameterNames();
        if (e != null && e.hasMoreElements()) posted.append("?");
        while (e != null && e.hasMoreElements()) {
            if (posted.length() > 1) posted.append("&");
            final String curr = (String) e.nextElement();
            posted.append(curr).append("=");
            if (curr.contains("password") || curr.contains("answer") || curr.contains("pwd")) {
                posted.append("*****");
            } else {
                posted.append(request.getParameter(curr));
            }
        }
        return posted.toString();
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {

        long startTime = (Long) request.getAttribute("startTime");

        long endTime = System.currentTimeMillis();

        long executeTime = endTime - startTime;
        // log it

        CSSLogger.info(new StringBuilder().append("[DURATION] executeTime : ").append(executeTime)
                .append(" MILLISECONDS").toString(), CLASSNAME);

    }

}
