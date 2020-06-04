package it.css;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import it.css.log.LoggingUtils;

@Configuration
public class SpringMvcConfigurer implements WebMvcConfigurer {

	private Logger logger = LoggerFactory.getLogger(SpringMvcConfigurer.class);

	@Bean
	public MessageSource messageSource() {
		ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
		messageSource.setBasename("props/message");
		return messageSource;
	}

	@Autowired
	private LoggingUtils loggingUtilsInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		logger.info("Adding interceptors for all calls");
		registry.addInterceptor(loggingUtilsInterceptor).addPathPatterns("/**");
	}
}
