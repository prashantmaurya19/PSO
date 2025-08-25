package com.PlayChess.com.RequestConsumerDispatcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class RequestConsumerDispatcherApplication {

	public static void main(String[] args) {
		SpringApplication.run(RequestConsumerDispatcherApplication.class, args);
	}

}
