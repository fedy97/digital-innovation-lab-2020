
package it.css.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map.Entry;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import it.css.log.CSSLogger;

public class ApiClientHttpRequestInterceptor implements ClientHttpRequestInterceptor {

    private static final String CLASSNAME = ApiClientHttpRequestInterceptor.class.getSimpleName();

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
            throws IOException {

        logRequest(request, body);
        ClientHttpResponse response = execution.execute(request, body);
        logResponse(response);
        return response;
    }

    private void logRequest(HttpRequest request, byte[] body) {

        CSSLogger.info("===========================request begin================================================",
                CLASSNAME);
        CSSLogger.info("URI         : " + request.getURI().getPath(), CLASSNAME);
        CSSLogger.info("Method      : " + request.getMethod(), CLASSNAME);
        CSSLogger.info("Headers     : " + headersToString(request.getHeaders()), CLASSNAME);
        CSSLogger.info("Request Body: " + Converter.bytesToString(body), CLASSNAME);
        CSSLogger.info("==========================request end================================================",
                CLASSNAME);
    }

    private void logResponse(ClientHttpResponse response) throws IOException {

        StringBuilder inputStringBuilder = new StringBuilder();
        BufferedReader bufferedReader = new BufferedReader(
                new InputStreamReader(response.getBody(), Converter.getCharset()));
        String line = bufferedReader.readLine();
        while (line != null) {
            inputStringBuilder.append(line);
            inputStringBuilder.append('\n');
            line = bufferedReader.readLine();
        }
        CSSLogger.info("============================response begin==========================================",
                CLASSNAME);
        CSSLogger.info("Status code  : " + response.getStatusCode(), CLASSNAME);
        CSSLogger.info("Status text  : " + response.getStatusText(), CLASSNAME);
        CSSLogger.info("Headers      : " + response.getHeaders(), CLASSNAME);
        CSSLogger.info("Response body: " + inputStringBuilder.toString(), CLASSNAME);
        CSSLogger.info("=======================response end=================================================",
                CLASSNAME);
    }

    private String headersToString(HttpHeaders headers) {

        StringBuilder builder = new StringBuilder();
        for (Entry<String, List<String>> entry : headers.entrySet()) {
            builder.append(entry.getKey()).append("=[");
            for (String value : entry.getValue()) {
                builder.append(value).append(",");
            }
            builder.setLength(builder.length() - 1); // Get rid of trailing comma
            builder.append("],");
        }
        builder.setLength(builder.length() - 1); // Get rid of trailing comma
        return builder.toString();
    }

}
