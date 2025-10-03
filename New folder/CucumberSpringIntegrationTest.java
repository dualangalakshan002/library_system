package com.library.librarysystem;


import io.cucumber.junit.platform.engine.Cucumber;
import org.junit.platform.suite.api.ConfigurationParameter;
import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;

@Cucumber
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.library.librarysystem")
public class CucumberSpringIntegrationTest {
}