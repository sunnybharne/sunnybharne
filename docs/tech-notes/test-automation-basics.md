# Test Automation Basics

## Selenium Basics

- [Guru99](https://www.guru99.com/introduction-to-selenium.html)

- [Selenium HQ](https://www.selenium.dev/documentation/overview/components/)

### The Same Origin Policy Issue

- [SOP](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

Same Origin policy prohibits JavaScript code from accessing elements from a domain that is different from where it was launched. 
Example, the HTML code in www.google.com uses a JavaScript program “randomScript.js”. 
The same origin policy will only allow randomScript.js to access pages within google.com such as google.com/mail, google.com/login, or google.com/signup. However, 
it cannot access pages from different sites such as yahoo.com/search or guru99.com because they belong to different domains.

### Drivers
![Driver.png](/static/Driver.png)

### Locators 
![Locator.png](/static/Locator.png)


- WebDriver does not support the “contains” keyword when used in the By.cssSelector() method.

### Get Commands
![Get.png](/static/Get.png)

### Navigate Commands

![NavigateCommands.png](/static/NavigateCommands.png)

### CSS Selector
- `css=tag#id`
- `css=tag.class`
- `css=tag[attribute=value]`
- `css=tag.class[attribute=value]`
- `css=tag:contains("inner text")`
- [src$='/images/Toolsqa.jpg']
- `select#oldSelectMenu>option:nth-of-type(2)`
-  `input[id^='userN']`
-  `input[id$='ame']`
-  `input[id*='ame']`

### Xpath
- `Xpath=//tagname[@attribute='value']`
- `Xpath=//td[text()='UserID']`
- `/html/body/div[2]/div[1]/div/h4[1]/b/html[1]/body[1]/div[2]/div[1]/div[1]/h4[1]/b[1]`- Absolute Xpath.
- `Relative XPath: //div[@class='featured-box cloumnsize1']//h4[1]//b[1]` - Relative Xpath.
- `Xpath=//*[contains(@type,'sub')]`
- `Xpath=//*[contains(text(),'here')]`
- `Xpath=//*[@type='submit' or @name='btnReset']`
- `Xpath=//input[@type='submit' and @name='btnLogin']`
- `Xpath=//label[starts-with(@id,'message')]`
- `Xpath=//*[@type='text']//following::input`
- `Xpath=//*[text()='Enterprise Testing']//ancestor::div`
- `Xpath=//*[@id='java_technologies']//child::li`
- `Xpath=//*[@type='submit']//preceding::input`
- `xpath=//*[@type='submit']//following-sibling::input`
- `Xpath=//*[@id='rt-feature']//parent::div`
- `Xpath =//*[@type='password']//self::input`
- `Xpath=//*[@id='rt-feature']//descendant::a`
### Locating By DOM
`document.getElementById("id of the element")`
`document.getElementByIds("id of the elements")`
`document.getElementByName("Name of the element")`
`document.getElementByNames("Name of the elements")`
`document.getElementsByName(“name“)[index]`

### Alerts
```Java
- driver.switchTo().alert().dismiss();
- driver.switchTo().alert().accept();
- driver.switchTo().alert().getText();
- driver.switchTo().alert().sendKeys("Text");
```
![Alerts](https://www.guru99.com/images/3-2016/032216_1314_AlertPopuph4.png)

### DropDowns 
![DropDown](https://toolsqa.com/gallery/selnium%20webdriver/2.Methods%20of%20Select%20class.png)
### Window Handles

### ToolTip 

- Basic Attribute validation.
![ToolTip](https://www.guru99.com/images/2-2017/072717_0606_VerifyToolt5.png)

- Using Actions API

![ToolTip](https://www.guru99.com/images/2-2017/072717_0606_VerifyToolt8.png)

### Broken Links

### Test Practice site
- `http://demo.guru99.com/test/newtours/`
- `https://demoqa.com/`
- [practice](https://ultimateqa.com/dummy-automation-websites/)

### SelectorsHub 

- Used for identifying elements on web page in web development tools.
```Elements from test site
css->
a:contains(SIGN-ON)
```

### WebElements Conditions
```
WebElement.isEnabled()
WebElement.isDesplayed()
WebElement.isSelected()
```

### Expected Conditions
```
Wait.until(ExpectedConditions.alertIsPresent()
Wait.until(ExpectedConditions.elementToBeClickable()
Wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt()
```

### Selenium Exceptions
**1. ElementNotVisibleException:** This type of Selenium exception occurs when an existing element in DOM has a feature set as hidden.

**2. ElementNotSelectableException:** This Selenium exception occurs when an element is presented in the [DOM](https://www.guru99.com/understanding-dom-fool-guide.html), but you can be able to select. Therefore, it is not possible to interact.

**3. NoSuchElementException:** This Exception occurs if an element could not be found.

**4. NoSuchFrameException:** This Exception occurs if the frame target to be switched to does not exist.

**5. NoAlertPresentException:** This Exception occurs when you switch to no presented alert.

**6. NoSuchWindowException:** This Exception occurs if the window target to be switch does not exist.

**7. StaleElementReferenceException:** This Selenium exception occurs happens when the web element is detached from the current DOM.

**8. SessionNotFoundException:** The WebDriver is acting after you quit the browser.

**9. TimeoutException:** Thrown when there is not enough time for a command to be completed. For Example, the element searched wasn’t found in the specified time.

**10. WebDriverException:** This Exception takes place when the WebDriver is acting right after you close the browser.

**11. ConnectionClosedException:** This type of Exception takes place when there is a disconnection in the driver.

**12. ElementClickInterceptedException:** The command may not be completed as the element receiving the events is concealing the element which was requested clicked.

**13. ElementNotInteractableException:** This Selenium exception is thrown when any element is presented in the DOM. However, it is impossible to interact with such an element.

**14. ErrorInResponseException:** This happens while interacting with the Firefox extension or the remote driver server.

**15. ErrorHandler.UnknownServerException:** Exception is used as a placeholder in case if the server returns an error without a stack trace.

**16. ImeActivationFailedException:** This expectation will occur when IME engine activation has failed.

**17. ImeNotAvailableException:** It takes place when IME support is unavailable.

**18. InsecureCertificateException:** Navigation made the user agent to hit a certificate warning. This can cause by an invalid or expired TLS certificate.

**19. InvalidArgumentException:** It occurs when an argument does not belong to the expected type.

**20. InvalidCookieDomainException:** This happens when you try to add a cookie under a different domain instead of current URL.

**21. InvalidCoordinatesException:** This type of Exception matches an interacting operation that is not valid.

**22. InvalidElementStateException:** It occurs when command can’t be finished when the element is invalid.

**23. InvalidSessionIdException:** This Exception took place when the given session ID is not included in the list of active sessions. It means the session does not exist or is inactive either.

**24. InvalidSwitchToTargetException:** This occurs when the frame or window target to be switched does not exist.

**25. JavascriptException:** This issue occurs while executing JavaScript given by the user.

**26. JsonException:** It occurs when you afford to get the session when the session is not created.

**27. NoSuchAttributeException:** This kind of Exception occurs when the attribute of an element could not be found.

**28. MoveTargetOutOfBoundsException:** It takes place if the target provided to the ActionChains move() methodology is not valid. For Example, out of the document.

**29. NoSuchContextException:** ContextAware does mobile device testing.

**30. NoSuchCookieException:** This Exception occurs when no cookie matching with the given pathname found for all the associated cookies of the currently browsing document.

**31. NotFoundException:** This Exception is a subclass of WebDriverException. This will occur when an element on the DOM does not exist.

**32. RemoteDriverServerException:** This Selenium exception is thrown when the server is not responding because of the problem that the capabilities described are not proper.

**33. ScreenshotException:** It is not possible to capture a screen.

**34. SessionNotCreatedException:** It happens when a new session could not be successfully created.

**35. UnableToSetCookieException:** This occurs if a driver is unable to set a cookie.

**36. UnexpectedTagNameException:** Happens if a support class did not get a web element as expected.

**37. UnhandledAlertException:** This expectation occurs when there is an alert, but WebDriver is not able to perform Alert operation.

**38. UnexpectedAlertPresentException:** It occurs when there is the appearance of an unexpected alert.

**39. UnknownMethodException:** This Exception happens when the requested command matches with a known URL but and not matching with a methodology for a specific URL.

**40. UnreachableBrowserException:** This Exception occurs only when the browser is not able to be opened or crashed because of some reason.

**41. UnsupportedCommandException:** This occurs when remote WebDriver doesn’t send valid commands as expected.
### Exceptions

- NoSuchElementException
- TimeoutException

### FindElements
```
WebElement loginLink = driver.findElement(By.linkText("Login"));
List<WebElement> listOfElements = driver.findElements(By.xpath("//div"));
driver.findElement(By.className("className"));
driver.findElement(By.cssSelector(".className"));
driver.findElement(By.id("elementId"));
driver.findElement(By.linkText("linkText"));
driver.findElement(By.name("elementName"));
driver.findElement(By.partialLinkText("partialText"));
driver.findElement(By.tagName("elementTagName"));
driver.findElement(By.xpath("xPath"));
```

### Timeouts
```
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
driver.manage().timeouts().scriptTimeout(Duration.ofMinutes(2));
driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));
```

### Wait 
```
new WebDriverWait(driver, Duration.ofSeconds(3))
  .until(ExpectedConditions.elementToBeClickable(By.cssSelector("#id")));

  Wait<WebDriver> wait = new FluentWait<WebDriver>(driver)
  .withTimeout(Duration.ofSeconds(30))
  .pollingEvery(Duration.ofSeconds(5))
  .ignoring(NoSuchElementException.class);
```

```java
Wait<WebDriver> wait = new FluentWait<WebDriver>(driver)
  .withTimeout(Duration.ofSeconds(30))
  .pollingEvery(Duration.ofSeconds(5))
  .ignoring(NoSuchElementException.class);
```

```java
		//Declare and initialise a fluent wait
		FluentWait wait = new FluentWait(driver);
		//Specify the timout of the wait
		wait.withTimeout(5000, TimeUnit.MILLISECONDS);
		//Sepcify polling time
		wait.pollingEvery(250, TimeUnit.MILLISECONDS);
		//Specify what exceptions to ignore
		wait.ignoring(NoSuchElementException.class)

		//This is how we specify the condition to wait on.
		//This is what we will explore more in this chapter
		wait.until(ExpectedConditions.alertIsPresent());
```
### Action Class
![Action.png](/static/Action.png)
![Action](https://www.guru99.com/images/image053.png)

### Upload Files

```Java
        // enter the file path onto the file-selection input field
        uploadElement.sendKeys("C:\\newhtml.html");
```

### Download Files

![Wget](https://www.guru99.com/images/image068.png)
`wget` is a command-line utility for downloading files from the web. It is available on most Unix-like operating systems and can be used to retrieve files using various protocols, including HTTP, HTTPS, and FTP. Here are some common use cases and examples:

### Basic Wget Usage:

1. **Download a File:**
   ```bash
   wget [URL]
   ```
   Replace `[URL]` with the actual URL of the file you want to download.

   Example:
   ```bash
   wget https://example.com/file.zip
   ```

2. **Save with a Different Name:**
   ```bash
   wget -O [output-file] [URL]
   ```
   Replace `[output-file]` with the desired name for the downloaded file.

   Example:
   ```bash
   wget -O myfile.zip https://example.com/file.zip
   ```

### Advanced Wget Usage:

3. **Resuming Downloads:**
   ```bash
   wget -c [URL]
   ```
   This option allows you to resume an interrupted download.

   Example:
   ```bash
   wget -c https://example.com/largefile.zip
   ```

4. **Limit Download Speed:**
   ```bash
   wget --limit-rate=[speed] [URL]
   ```
   Replace `[speed]` with the desired download speed limit.

   Example:
   ```bash
   wget --limit-rate=100k https://example.com/largefile.zip
   ```

5. **Download in the Background:**
   ```bash
   wget -b [URL]
   ```
   This runs `wget` in the background.

   Example:
   ```bash
   wget -b https://example.com/file.zip
   ```

6. **Download Entire Website:**
   ```bash
   wget --recursive --no-clobber --page-requisites --html-extension --convert-links --domains example.com --no-parent [URL]
   ```
   This command downloads a complete website.

   Example:
   ```bash
   wget --recursive --no-clobber --page-requisites --html-extension --convert-links --domains example.com --no-parent https://example.com
   ```

### Desired Capabilities 

![Capabilities](https://www.guru99.com/images/3-2016/032216_0948_DesiredCapa1.jpg)


<iframe src="https://w3c.github.io/webdriver/#capabilities" width="100%" height="2000px" scrolling="no"></iframe>

```java
FirefoxOptions browserOptions = new FirefoxOptions();
browserOptions.setPlatformName("Windows 10");
browserOptions.setBrowserVersion("92");
Map<String, Object> cloudOptions = new HashMap<>();
cloudOptions.put("build", myTestBuild);
cloudOptions.put("name", myTestName);
browserOptions.setCapability("cloud:options", cloudOptions);
WebDriver driver = new RemoteWebDriver(new URL(cloudUrl), browserOptions);
```

```Java
ChromeOptions options = new ChromeOptions()
options.addArgument("start-maximized");
ChromeDriver driver = new ChromeDriver(options);
```

```Java
// Create an object of desired capabilities class with Chrome driver
DesiredCapabilities SSLCertificate = DesiredCapabilities.chrome();
// Set the pre defined capability – ACCEPT_SSL_CERTS value to true
SSLCertificate.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
// Open a new instance of chrome driver with the desired capability
WebDriver driver = new ChromeDriver(SSLCertificate);
```
Below are the list of available and most commonly used arguments for ChromeOptions class

- **start-maximized**: Opens Chrome in maximize mode
- **incognito:** Opens Chrome in incognito mode
- **headless:** Opens Chrome in headless mode
- **disable-extensions**: Disables existing extensions on Chrome browser
- **disable-popup-blocking**: Disables pop-ups displayed on Chrome browser
- **make-default-browser:** Makes Chrome default browser
- **version**: Prints chrome browser version
- **disable-infobars:** Prevents Chrome from displaying the notification ‘Chrome is being controlled by automated software
[Browser Options](https://w3c.github.io/webdriver/#capabilities)
### New Mutable Capabilities 

```
MutableCapabilities capabilities = new MutableCapabilities();
capabilities.setCapability("platformVersion", "Windows 10");
FirefoxOptions options = new FirefoxOptions();
options.setHeadless(true);
options = .merge(capabilities);

// The result of the `merge` call needs to be assigned to an object.
```

### ScreenShots 
```Java
public static void takeSnapShot(WebDriver webdriver,String fileWithPath) throws Exception{
//Convert web driver object to TakeScreenshot
TakesScreenshot scrShot =((TakesScreenshot)webdriver);
//Call getScreenshotAs method to create image file
File SrcFile=scrShot.getScreenshotAs(OutputType.FILE);
//Move image file to new destination
File DestFile=new File(fileWithPath);
//Copy file at destination
FileUtils.copyFile(SrcFile, DestFile);
}
```

### Desgin Patterns

- [Design Patterns ](https://www.browserstack.com/guide/design-patterns-in-automation-framework")
### Singleton Design Pattern

Singleton Design Pattern is one of the easiest and straightforward patterns to be implemented in an automation framework. This design is used when we need to use the same object of a class across the automation framework. It restricts the instantiation of a class to a single instance. 

Steps to follow to create singleton class:

1.   Declare the constructor of the class as **‘private’** so that no one can instantiate the class outside of it
2.   Declare a static reference variable of class
3.   Declare a static method with return type as an object of this singleton class which should check if the class is already instantiated once.

```Java
public class SingletonBaseClass {

private static WebDriver driver = null;
private static String browserName= "chrome";

public static void init() {
if (driver == null) {
if (browserName.equalsIgnoreCase("chrome")) {
WebDriverManager.chromedriver().setup();
driver = new ChromeDriver();
} else if (browserName.equalsIgnoreCase("firefox")) {
WebDriverManager.firefoxdriver().setup();
driver = new FirefoxDriver();
}
}
driver.manage().deleteAllCookies();
driver.manage().window().maximize();
} 
public static WebDriver getDriver() {
return driver;
} 
public static void quit() {
driver.quit();
driver=null;
}
}
```
### Page Object Model
![POM](https://browserstack.wpenginepowered.com/wp-content/uploads/2022/11/POM.png)

- Base Class 
```Java
public class BaseClass {
static WebDriver driver;
static String browserName = "chrome";
static String url = "http://automationpractice.com/index.php";

public static WebDriver init() {
if (browserName.equalsIgnoreCase("chrome")) {
WebDriverManager.chromedriver().setup();
driver = new ChromeDriver();
} else if (browserName.equalsIgnoreCase("firefox")) {
WebDriverManager.firefoxdriver().setup();
driver = new FirefoxDriver();
}
driver.manage().deleteAllCookies();
driver.manage().window().maximize();
driver.get(url);
return driver;
} 
}
```

- HomePage

```Jave
public class HomePage{
WebDriver driver;

@FindBy(css = "a.login")
@CacheLookup
private WebElement signIn;

@FindBy(css = "input#search_query_top")
private WebElement search;

@FindBy(xpath = "//button[@name='submit_search']")c
private WebElement seacrhIcon;

@FindBy(css = "a.logout")
private WebElement signOut;

public LoginPage clickSignIn() {
signIn.click();
return new LoginPage(driver);
} 
public SearchPage search(String text) {
search.sendKeys(text);
seacrhIcon.click();
return new SearchPage(driver);
} 
public boolean logoutisDisplayed() {
return signOut.isDisplayed();
} 
public HomePage(WebDriver driver) {
PageFactory.initElements(driver, this);
}

}
```


```Java
import java.time.Duration;
import java.util.Properties;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import com.qa.hubspot.base.BasePage;
import com.qa.hubspot.util.Constants;
import com.qa.hubspot.util.ElementActions;

public class LoginPage extends BasePage {

WebDriver driver;
ElementActions elementActions;

//1. Create OR/Page objects -> using by locator

By userinputbox = By.xpath("//input[@id='react-select-2-input']");
By paaswordinputbox = By.xpath("//input[@id='react-select-3-input']");
By loginBtn = By.xpath("//button[@id='login-btn']");

//2. Define a constructor
public LoginPage(WebDriver driver)
{
this.driver = driver;
elementActions = new ElementActions(driver);
}

//3. Page Actions/Methods
public String getLoginPageTitle()
{
return elementActions.waitForPageTitle(Constants.LOGIN_PAGE_TITLE);
}

public HomePage doLogin(String username,String pwd) {

elementActions.doSendkeys(userinputbox, username);
driver.findElement(userinputbox).sendKeys(Keys.TAB);
elementActions.doSendkeys(paaswordinputbox, pwd);
driver.findElement(paaswordinputbox).sendKeys(Keys.TAB);
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
elementActions.doClick(loginBtn);
return new HomePage(driver);
} 
}

HomePage -
import java.util.Properties;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import com.qa.hubspot.base.BasePage;
import com.qa.hubspot.util.Constants;
import com.qa.hubspot.util.ElementActions;

public class HomePage extends BasePage{

WebDriver driver;
Properties prop;
ElementActions elementActions;

//locators
By BSLogo = By.xpath("//a[@class='Navbar_logo__26S5Y']");
By accountName = By.xpath("//span[contains(text(),'demouser')]");

public HomePage(WebDriver driver)
{
this.driver = driver;
elementActions = new ElementActions(driver);
}

//Page Actions
public String getHomePageTitle()
{
return elementActions.waitForPageTitle(Constants.HOME_PAGE_TITLE);
}

public boolean isHomePageLogoVisible()
{
return elementActions.isElementDisplayed(BSLogo);
}
public boolean isAccountNameVisible()
{
return elementActions.isElementDisplayed(accountName);
}
public String getAccountNameText()
{
return elementActions.doGetText(accountName);
}
}
```

### Fluent Page Object Model
- provides method chaining

```Java
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;

public class BSLoginPage {
WebDriver driver;
By usernm = By.xpath("//input[@id='react-select-2-input']");
By password = By.xpath("//input[@id='react-select-3-input']");
By loginBtn = By.xpath("//button[@id='login-btn']");

public BSLoginPage(WebDriver driver)
{
this.driver = driver;
}

public BSLoginPage enterUsername(String username)
{
driver.findElement(usernm).sendKeys(username);
driver.findElement(usernm).sendKeys(Keys.TAB);
return this;
}

public BSLoginPage enterPassword(String passwd)
{
driver.findElement(password).sendKeys(passwd);
driver.findElement(password).sendKeys(Keys.TAB);
return this;
} 
public HomePage clickLoginBtn()
{
driver.findElement(loginBtn).click();
return new HomePage(driver);
} 
}
```

### Factory Design Pattern

Factory Design Pattern is one of the most used creational patterns as it provides one of the best ways to create  an object. The term factory here means that there should be a class with a factory method which deals with all the creational stuff.

In this pattern, there is a superclass with multiple subclasses and based on the user input at test class level, it returns one of the subclasses. In other words, it is used to create an object from one of the possible classes that extends a common parent class/ implements an interface. The instantiation logic would be the responsibility of the class that is extending the parent class thereby it hides the complex code at test level. As a user, we just need to create an object of this class and use it in the test class to call the appropriate method holding the business logic.

![Factory](https://browserstack.wpenginepowered.com/wp-content/uploads/2022/12/Page-Factory-Design-Pattern-1.png)

```Java
public abstract class DriverManager {
protected WebDriver driver;
public WebDriver getDriver() {
return driver;
}
}
```

```Java
public class ChromeDriverManager extends DriverManager {

public ChromeDriverManager() {
WebDriverManager.chromedriver().setup();
driver = new ChromeDriver();
}
}
```

```Java
public class DriverManagerFactory {

public static DriverManager getManager(DriverType type) {
DriverManager driverManager = null;

switch (type) {
case CHROME:
driverManager = new ChromeDriverManager(); 
case FIREFOX:
driverManager = new FirefoxDriverManager(); 
case EDGE:
driverManager = new EdgeDriverManager(); 
default:
break;
}
return driverManager;
}
}
```

```Java
public enum DriverType {
CHROME,
FIREFOX,
EDGE,
SAFARI;
}
```

```Java
@BeforeTest
public void beforeTest() {
driverManager = DriverManagerFactory.getManager(DriverType.CHROME);
driver=driverManager.getDriver();
}
```
### Facade Design Pattern
Facade design pattern comes under structural design patterns. It provides a simple interface to deal with complex code. In this pattern we create a facade class which has methods that combine actions executed on different pages. This is an extension to the Page Object Model pattern.

Following example can help you under **Facade** in a layman sense.

When we visit any restaurant to order our favourite food, we are not aware of what cuisine the restaurant serves unless we see the menu card or ask the waiter about it. We are just interested in ordering the food by using a waiter/menu card as the interface(facade) and do not worry about how it is actually being prepared in the kitchen. 

![Facade](https://browserstack.wpenginepowered.com/wp-content/uploads/2022/11/Facade.png)
### PageFactory

<iframe src="https://www.guru99.com/page-object-model-pom-page-factory-in-selenium-ultimate-guide.html#what-is-page-factory-in-selenium" width="100%" height="8220px" scrolling="no"></iframe>


### Parameterization


<iframe src="https://www.guru99.com/parameterization-using-xml-and-dataproviders-selenium.html#type-of-parameterization-in-testng" width="100%" height="21220px" scrolling="no"></iframe>


- [Stratagy Desgin Pattern](https://toolsqa.com/selenium-webdriver/strategy-design-pattern-automation-testing/)


### Apache POI


<iframe src="https://www.guru99.com/all-about-excel-in-selenium-poi-jxl.html#exporting-excel" width="100%" height="12220px" scrolling="no"></iframe>

### Robot Class

- [Robot Class](https://www.guru99.com/using-robot-api-selenium.html)

### Sikuli 

- [Sikuli Basics](https://www.guru99.com/sikuli-tutorial.html)
### Scrolling

```Java
JavascriptExecutor js = (JavascriptExecutor) driver;  
   js.executeScript(Script,Arguments);
   js.executeScript("window.scrollBy(0,1000)");
        
//This will scroll the page Horizontally till the element is found		
js.executeScript("arguments[0].scrollIntoView();", Element);
```

### Property File Object Repository

```Java 
Properties obj = new Properties();
FileInputStream objfile = new FileInputStream(System.getProperty("user.dir")+"\\application.properties");
obj.load(objfile);
String mobileTesting = obj.getProperty("MobileTesting");
```

### Practice Web Sites
1. https://the-internet.herokuapp.com/
2. https://demoqa.com/
3. https://candymapper.com/
4. https://the-internet.herokuapp.com/dynamic_loading
5. https://www.saucedemo.com/
6. https://www.demoblaze.com
7. https://the-internet.herokuapp.com/upload
8. https://formy-project.herokuapp.com/
9. https://the-internet.herokuapp.com/floating_menu

## SoupUI

![API Basics.png](/static/API.png)
![API Basics.png](/static/APIBasics.png)


### API (Application Programming Interface) Basic Concepts

APIs, or Application Programming Interfaces, are essential components of software and system development, enabling applications to communicate and interact with each other. Here are some fundamental concepts related to APIs:

### What is an API?

- An API is a set of rules and protocols that allows different software applications to communicate and interact with each other.

- It defines the methods and data formats that applications can use to request and exchange information.

- APIs can be used to access functionality or data from services, libraries, or external systems.

### Types of APIs

1. **Web APIs**: Web APIs, often referred to as REST or SOAP APIs, are accessed over the internet using standard HTTP methods. They allow applications to communicate over the web.

2. **Library APIs**: Library APIs are sets of functions and procedures that developers can use to perform specific tasks or operations within a program.

3. **Operating System APIs**: These APIs provide access to the underlying functions and services of an operating system, such as file management, hardware control, and process management.

4. **Database APIs**: Database APIs enable applications to interact with databases, allowing data retrieval, modification, and management.

### Key Concepts

- **Endpoints**: Endpoints are specific URLs or URIs that represent different functionalities or resources provided by a web API. Each endpoint corresponds to a specific action.

- **HTTP Methods**: APIs use HTTP methods (e.g., GET, POST, PUT, DELETE) to perform operations on resources. For example, GET retrieves data, while POST creates new data.

- **Request and Response**: An API request is made by a client to access a resource, and the server responds with data or the result of the requested operation.

- **Authentication**: Many APIs require authentication, ensuring that only authorized users or applications can access the data or services.

- **Rate Limiting**: APIs may have rate limits to control the number of requests a client can make within a specific time frame to prevent abuse.

- **Versioning**: API versions are used to maintain compatibility. When changes are made, older versions can still be used by existing clients.

## Use Cases

- **Integration**: APIs are crucial for integrating services and systems, allowing them to work together and share data.

- **Third-Party Services**: Developers use APIs to access services and data provided by external organizations, such as social media platforms or payment gateways.

- **Mobile Apps**: Mobile apps often use APIs to access server-side functionality, such as retrieving data from a remote server.

- **Automation**: APIs are used for automating tasks, enabling software to interact with other software without manual intervention.

- **Data Access**: APIs provide structured access to data, making it easier to retrieve and manipulate information.

APIs are the building blocks of modern software development, enabling interoperability and data exchange between a wide range of applications and systems.

### Structure of a SOAP message

A SOAP message is encoded as an XML document, consisting of an "Envelope" element, which contains an optional "Header" element, and a mandatory "Body" element. The "Fault" element, contained in the "Body", is used for reporting errors.

### 1 Envelope

The SOAP "Envelope" is the root element in every SOAP message. It contains two child elements, an optional "Header", and a mandatory "Body".

### 2 Header

The SOAP "Header" is an optional subelement of the SOAP envelope. It is used to pass application-related information that is to be processed by SOAP nodes along the message path.

### 3 Body

The SOAP "Body" is a mandatory subelement of the SOAP envelope. It contains information intended for the ultimate recipient of the message.

### 4 Fault

The SOAP "Fault" is a subelement of the SOAP body, which is used for reporting errors.

With the exception of the "Fault" element, which is contained in the "Body" of a SOAP message, XML elements in the "Header" and the "Body" are defined by the applications that make use of them. However, the SOAP specification imposes some constraints on their structure.

### Structure of a SOAP message

<!-- ![soapmsg.gif](/soapmsg.gif) -->

### example of a SOAP message

```soap
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
   <soap:Header/>
   <soap:Body>
      <tem:Add>
         <tem:a>7</tem:a>
         <tem:b>6</tem:b>
      </tem:Add>
   </soap:Body>
</soap:Envelope>
```

```soap
<?xml version='1.0' ?>
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope"> 
 <env:Header>
  <m:reservation xmlns:m="http://travelcompany.example.org/reservation" 
          env:role="http://www.w3.org/2003/05/soap-envelope/role/next"
           env:mustUnderstand="true">
   <m:reference>uuid:093a2da1-q345-739r-ba5d-pqff98fe8j7d</m:reference>
   <m:dateAndTime>2001-11-29T13:20:00.000-05:00</m:dateAndTime>
  </m:reservation>
  <n:passenger xmlns:n="http://mycompany.example.com/employees"
          env:role="http://www.w3.org/2003/05/soap-envelope/role/next"
           env:mustUnderstand="true">
   <n:name>Åke Jógvan Øyvind</n:name>
  </n:passenger>
 </env:Header>
 <env:Body>
  <p:itinerary
    xmlns:p="http://travelcompany.example.org/reservation/travel">
   <p:departure>
     <p:departing>New York</p:departing>
     <p:arriving>Los Angeles</p:arriving>
     <p:departureDate>2001-12-14</p:departureDate>
     <p:departureTime>late afternoon</p:departureTime>
     <p:seatPreference>aisle</p:seatPreference>
   </p:departure>
   <p:return>
     <p:departing>Los Angeles</p:departing>
     <p:arriving>New York</p:arriving>
     <p:departureDate>2001-12-20</p:departureDate>
     <p:departureTime>mid-morning</p:departureTime>
     <p:seatPreference/>
   </p:return>
  </p:itinerary>
  <q:lodging
   xmlns:q="http://travelcompany.example.org/reservation/hotels">
   <q:preference>none</q:preference>
  </q:lodging>
 </env:Body>
</env:Envelope>
```


### WSDL (Web Services Description Language)

WSDL is an XML-based language used to describe web services and their functionality.

- **Service**: Describes the service's name and location (URL).

- **Ports**: Define the endpoints for the service.

- **Operations**: Specify the functions or methods that can be called on the service.

- **Messages**: Describe the data exchanged between the client and the service.

- **Data Types**: Define the data structures used by the service.

### WSDL Purpose

- WSDL is essential in web service development for integrating different systems and allowing them to communicate over a network.

- It defines the contract between service providers and consumers, ensuring both parties understand how to interact.

- When used with SOAP (Simple Object Access Protocol), it creates platform-independent web services.

### Example WSDL Structure

```xml
<definitions name="MyService"
    targetNamespace="http://example.com/myservice.wsdl"
    xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:tns="http://example.com/myservice.wsdl">
    
    <service name="MyService">
        <port name="MyServicePort" binding="tns:MyServiceBinding">
            <soap:address location="http://example.com/myservice"/>
        </port>
    </service>
    
    <binding name="MyServiceBinding" type="tns:MyServicePortType">
        <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="doSomething">
            <soap:operation soapAction="http://example.com/myservice#doSomething"/>
            <input>
                <soap:body use="encoded" namespace="urn:example" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </input>
            <output>
                <soap:body use="encoded" namespace="urn:example" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </output>
        </operation>
    </binding>
    
    <portType name="MyServicePortType">
        <operation name="doSomething">
            <input message="tns:doSomethingIn"/>
            <output message="tns:doSomethingOut"/>
        </operation>
    </portType>
    
    <message name="doSomethingIn">
        <part name="parameters" element="tns:doSomething"/>
    </message>
    
    <message name="doSomethingOut">
        <part name="parameters" element="tns:doSomethingResponse"/>
    </message>
    
    <element name="doSomething" type="xsd:string"/>
    
    <element name="doSomethingResponse" type="xsd:string"/>
</definitions>
```

### WSDL Usage

- WSDL files can be used to generate client code (proxy classes) or server code (skeleton classes) in various programming languages to interact with web services.

- They play a crucial role in enabling the interoperability of web services in a standardized way.

WSDL is fundamental in building and accessing web services in a structured and consistent manner. Understanding its structure and usage is essential for web service development and integration.


### Message Structure 

SOAP (Simple Object Access Protocol) is a protocol used for exchanging structured information in the implementation of web services. A SOAP message consists of several key elements that define its structure:

### Envelope

- The `<Envelope>` element is the root element of a SOAP message.

- It encapsulates the entire SOAP message and defines the XML namespace for SOAP.

```xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:web="http://www.example.com/webservice">
    <!-- Body and Header elements go here -->
</soapenv:Envelope>
```

### Header

- The optional `<Header>` element contains additional metadata about the SOAP message.

- It can include information like authentication credentials, routing instructions, or application-specific data.

```xml
<soapenv:Header>
    <!-- Header data goes here -->
</soapenv:Header>
```

### Body

- The `<Body>` element contains the actual content of the SOAP message.

- It defines the payload, which typically includes the request or response data for a web service operation.

```xml
<soapenv:Body>
    <!-- Request or response data goes here -->
</soapenv:Body>
```

### Fault

- In the event of an error or exception, a SOAP message may contain a `<Fault>` element within the `<Body>`.

- The `<Fault>` element provides information about the error, including a fault code, fault string, and optional details.

```xml
<soapenv:Fault>
    <faultcode>soapenv:Server</faultcode>
    <faultstring>Invalid input</faultstring>
    <detail>
        <!-- Error details go here -->
    </detail>
</soapenv:Fault>
```

### Namespace Prefixes

- SOAP messages typically use namespace prefixes to define namespaces and reference elements.

- Commonly used prefixes include `soapenv` for the SOAP envelope and `web` for the web service namespace.

### Example SOAP Message

Here's an example of a simple SOAP message structure:

```xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:web="http://www.example.com/webservice">
    <soapenv:Header>
        <!-- Header data goes here -->
    </soapenv:Header>
    <soapenv:Body>
        <!-- Request or response data goes here -->
    </soapenv:Body>
</soapenv:Envelope>
```

The structure of a SOAP message is well-defined and allows for the exchange of structured data in a standardized manner, making it a key technology for web service communication.

### Structure of a SOAP message

![soapmsg.gif](/static/soapmsg.gif)

### Properties


### Types of Properties

1. **Test Case Properties**: These properties are specific to a particular test case and are used to store data or values that are needed within that test case. Test case properties can be set and accessed only within the scope of that test case.
2. **Test Suite Properties**: Test suite properties are at the test suite level and can be accessed by all the test cases within the same test suite. They are valuable for sharing data among test cases within a specific test suite.
3. **Project Properties**: Project properties are accessible to all test cases within a project, making them suitable for storing data that needs to be shared across multiple test cases within the same project.
4. **Test Step Properties**: Test step properties are specific to an individual test step within a test case. They are used to store data or values required for a particular test step's operation.

![PropertyFile.png](/static/PropertyFile.png)

### Common Uses of Properties

- **Data-Driven Testing**: You can use properties to parameterize test data, making it easy to run the same test with different input values.

- **Dynamic Endpoints**: When testing services with variable endpoints, properties allow you to change the endpoint dynamically based on the test case's requirements.

- **Assertions and Validation**: Properties are useful for storing expected values to compare with actual responses during test execution.

- **Environment Configuration**: You can store environment-specific configurations, such as server URLs or authentication credentials, as properties.

### Property Expansion

- SoapUI supports property expansion, which allows you to reference and use property values within various parts of your test steps, request parameters, and response assertions.

- Property expansion is done by enclosing the property name in double curly braces, like `${#TestCase#Property}` or `${#Project#Property}`.

- For example, you can use property expansion to inject dynamic data into a request or to specify the expected outcome in an assertion.

### Property Transfer

- Property transfer is a feature in SoapUI that allows you to extract data from one part of a response and store it in a property for later use in the test case.

- It's commonly used to capture values from a response (e.g., an authentication token) and reuse them in subsequent requests.

### Scripting and Properties

- Properties can be manipulated using Groovy or JavaScript scripting within SoapUI. This allows you to perform dynamic operations on property values during test execution.

### Property Steps

- SoapUI provides specific test steps, such as "Property Transfer" and "Property Loop," to work with properties efficiently.

- "Property Transfer" steps allow you to extract and set property values.

- "Property Loop" steps enable you to iterate over a range of property values, making it easy to repeat test steps multiple times with different data.

Properties in SoapUI are a powerful tool for building flexible and data-driven test cases, enhancing the reusability and efficiency of your API and web service testing efforts.

### Assertions  


Assertions in SoapUI are used to validate the responses and behavior of web services during testing. They help ensure that the service meets the expected criteria.

### Types of Assertions

SoapUI supports various types of assertions, including:

### Response Assertion
Compares the response against expected values, status codes, or patterns.
![Assertion1.png](/static/Assertion1.png)

2. **XPath Assertion**: Validates elements or attributes in XML responses using XPath expressions.

![Pasted image 20231030120541.png](/static/Pasted image 20231030120541.png)
### Tag existence 
![Pasted image 20231030121534.png](/static/Pasted image 20231030121534.png)
### Tag Counts
![Pasted image 20231030121736.png](/static/Pasted image 20231030121736.png)

### Entire XML validation
![Pasted image 20231030124104.png](/static/Pasted image 20231030124104.png)
### Allow Wildcards in Xpath
![Pasted image 20231030124205.png](/static/Pasted image 20231030124205.png)
3. **Script Assertion**: Allows you to write custom scripts (e.g., Groovy scripts) to define complex validation logic.

4. **JSONPath Assertion**: Similar to XPath but for JSON responses, it uses JSONPath expressions for validation.
### SLA Assertion
![Pasted image 20231030114954.png](/static/Pasted image 20231030114954.png)
### Status Code Assertion
![Pasted image 20231030114645.png](/static/Pasted image 20231030114645.png)
### Contains Assertion
![Pasted image 20231030112811.png](/static/Pasted image 20231030112811.png)

### Token validation
![Pasted image 20231030115352.png](/static/Pasted image 20231030115352.png)
### Not Contains Assertion
![Pasted image 20231030114050.png](/static/Pasted image 20231030114050.png)
8. **Length Assertion**: Verifies the length of the response content.

9. **SOAP Fault Assertion**: Ensures that a response contains a SOAP fault when expected.

### Using Assertions

To use assertions in SoapUI:

1. Create a test step in your test case (e.g., a REST or SOAP request).

2. Open the test step and navigate to the "Assertions" tab.

3. Add the desired assertion type based on what you want to validate.

4. Configure the assertion's settings, such as expected values or patterns.

5. Run the test case, and SoapUI will report whether the assertions pass or fail.

### Importance of Assertions

- Assertions help automate the validation process, making it easier to detect issues and changes in web service behavior.

- They play a critical role in regression testing, ensuring that new updates don't break existing functionality.

- By specifying expected outcomes, assertions provide clear pass/fail criteria for testing.

- They improve the reliability and accuracy of testing by reducing manual verification efforts.

- Assertions are an essential part of SoapUI's functionality, making it a powerful tool for testing and quality assurance.

Using assertions in SoapUI is crucial for robust testing of web services, enabling thorough verification of expected results and service behavior.

### WSDL

### WSDL (Web Services Description Language)

WSDL is an XML-based language used to describe web services and their functionality.

- **Service**: Describes the service's name and location (URL).

- **Ports**: Define the endpoints for the service.

- **Operations**: Specify the functions or methods that can be called on the service.

- **Messages**: Describe the data exchanged between the client and the service.

- **Data Types**: Define the data structures used by the service.

### WSDL Purpose

- WSDL is essential in web service development for integrating different systems and allowing them to communicate over a network.

- It defines the contract between service providers and consumers, ensuring both parties understand how to interact.

- When used with SOAP (Simple Object Access Protocol), it creates platform-independent web services.

### Example WSDL Structure

```xml
<definitions name="MyService"
    targetNamespace="http://example.com/myservice.wsdl"
    xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:tns="http://example.com/myservice.wsdl">
    
    <service name="MyService">
        <port name="MyServicePort" binding="tns:MyServiceBinding">
            <soap:address location="http://example.com/myservice"/>
        </port>
    </service>
    
    <binding name="MyServiceBinding" type="tns:MyServicePortType">
        <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="doSomething">
            <soap:operation soapAction="http://example.com/myservice#doSomething"/>
            <input>
                <soap:body use="encoded" namespace="urn:example" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </input>
            <output>
                <soap:body use="encoded" namespace="urn:example" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </output>
        </operation>
    </binding>
    
    <portType name="MyServicePortType">
        <operation name="doSomething">
            <input message="tns:doSomethingIn"/>
            <output message="tns:doSomethingOut"/>
        </operation>
    </portType>
    
    <message name="doSomethingIn">
        <part name="parameters" element="tns:doSomething"/>
    </message>
    
    <message name="doSomethingOut">
        <part name="parameters" element="tns:doSomethingResponse"/>
    </message>
    
    <element name="doSomething" type="xsd:string"/>
    
    <element name="doSomethingResponse" type="xsd:string"/>
</definitions>
```

### WSDL Usage

- WSDL files can be used to generate client code (proxy classes) or server code (skeleton classes) in various programming languages to interact with web services.

- They play a crucial role in enabling the interoperability of web services in a standardized way.

WSDL is fundamental in building and accessing web services in a structured and consistent manner. Understanding its structure and usage is essential for web service development and integration.

### WSDL

### 1. Creating a Test Case and Making a Request

```groovy
// Create a new Test Case
def testCase = testRunner.testCase.createTestStep("MyTestCase")

// Create a new Test Request
def testRequest = testCase.addTestRequest("MyTestRequest")

// Set the endpoint URL
def endpoint = "https://api.example.com"
testRequest.setPropertyValue("Endpoint", endpoint)

// Set the request body
def requestBody = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com">
    <soapenv:Header/>
    <soapenv:Body>
        <web:MyRequest>
            <web:Parameter1>Value1</web:Parameter1>
            <web:Parameter2>Value2</web:Parameter2>
        </web:MyRequest>
    </soapenv:Body>
</soapenv:Envelope>
"""
testRequest.setRequestContent(requestBody)

// Execute the request
def response = testRequest.run(null, true)
log.info("Response: " + response.getResponseContent())
```

### 2. Data-Driven Testing

```groovy
import com.eviware.soapui.support.GroovyUtils

// Load data from an external source (e.g., CSV file)
def csvFile = "data.csv"
def data = new GroovyUtils(context).getXmlHolder(csvFile)

// Loop through the data rows and execute requests for each row
while (data["//row"]) {
    def parameter1 = data.getNodeValues("Parameter1").join()
    def parameter2 = data.getNodeValues("Parameter2").join()

    // Create a new Test Case for each data row
    def testCase = testRunner.testCase.createTestStep("Data-Driven-Test")

    // Create a new Test Request
    def testRequest = testCase.addTestRequest("Data-Driven-Request")

    // Set the endpoint URL
    def endpoint = "https://api.example.com"
    testRequest.setPropertyValue("Endpoint", endpoint)

    // Set the request body with parameters from the data source
    def requestBody = """
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com">
        <soapenv:Header/>
        <soapenv:Body>
            <web:MyRequest>
                <web:Parameter1>${parameter1}</web:Parameter1>
                <web:Parameter2>${parameter2}</web:Parameter2>
            </web:MyRequest>
        </soapenv:Body>
    </soapenv:Envelope>
    """
    testRequest.setRequestContent(requestBody)

    // Execute the request and log the response
    def response = testRequest.run(null, true)
    log.info("Response for Parameter1: ${parameter1}, Parameter2: ${parameter2}: " + response.getResponseContent())
    
    // Move to the next row in the data source
    data = data.getNextSibling()
}
```

### 3. Adding Assertions

```groovy
// Create a new Test Case
def testCase = testRunner.testCase.createTestStep("Assertions-Test")

// Create a new Test Request
def testRequest = testCase.addTestRequest("Assertions-Request")

// Set the endpoint URL
def endpoint = "https://api.example.com"
testRequest.setPropertyValue("Endpoint", endpoint)

// Set the request body
def requestBody = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com">
    <soapenv:Header/>
    <soapenv:Body>
        <web:MyRequest>
            <web:Parameter1>Value1</web:Parameter1>
            <web:Parameter2>Value2</web:Parameter2>
        </web:MyRequest>
    </soapenv:Body>
</soapenv:Envelope>
"""
testRequest.setRequestContent(requestBody)

// Execute the request
def response = testRequest.run(null, true)
def responseContent = response.getResponseContent()

// Add an assertion to check if a specific element exists in the response
def assertion = testRequest.addAssertion("Response Contains")
assertion.setConfiguration("<XPath Match='//web:SomeElement'/>")
assertion.setMessageContent(responseContent)

// Execute the assertion
assertion.assertResponse()
```

These code examples provide a practical demonstration of creating test cases, making requests, performing data-driven testing, and adding assertions in SoapUI using Groovy scripting. You can adapt and expand these examples to suit your specific testing needs.

### Project

### Service Description(Wsdl)
```wsdl
http://216.10.245.166:8080/axis2/services/EmployeeManagementService?wsdl
```

![WSDL1.png](/static/WSDL1.png)


![WSDL2.png](/static/WSDL2.png)

![WSDL3.png](/static/WSDL3.png)


## Rest Assured

[ToolsQA](https://www.toolsqa.com/rest-assured-tutorial/)

[QA Automation Expert](https://qaautomation.expert/2023/10/12/rest-assured-tutorials/)

[Rest Assured Official site](https://github.com/rest-assured/rest-assured/wiki/Usage)
### API Flow

![APIBasics.png](/static/APIBasics.png)

### Http Basics

![Https.png](/static/Https.png)


## HTTP methods



**GET** 	Asks to get the resource at the requested URL.
**POST** 	Asks the server to accept the body info attached. It is like GET request with extra info sent with the request.
**HEAD** 	Asks for only the header part of whatever a GET would return. Just like GET but with no body.
**TRACE** Asks for the loopback of the request message, for testing or troubleshooting.
**PUT**   Says to put the enclosed info (the body) at the requested URL.
**DELETE** 	Says to delete the resource at the requested URL.
**OPTIONS** 	Asks for a list of the HTTP methods to which the thing at the request URL can respond
**PATCH**: For partial updates.

1. 1xx (100 – 199): The response is informational
2. 2xx (200 – 299): Assures successful response
3. 3xx (300 – 399): You are required to take further action to fulfill the request
4. 4xx (400 – 499): There’s a bad syntax and the request cannot be completed
5. 5xx (500 – 599): The server entirely fails to complete the request

### Example
```bash
https://domain.com/?key1=value1&key2=value2
```

### HTTP Request 

### _Request Line_
-  _The HTTP method used_
- _The request URI_
- _The HTTP protocol version_

### _Zero or more headers_
- _User-Agent: lets the server identify the application, operating system, vendor, and version._
- _Connection: controls the network connection. In other words, kill or continues the connection after the transaction._
- _Cache-Control: specifies browser caching policies._
- _Accept-Language: indicates what all languages(natural) the client can understand._
- _Accept-Charset_
- _Accept-Encoding_
- _Authorization_
- _Content-Length_
- _Content-Type_
- _Cookie_
- _Expect_
- _From_
- _Host_
- _If-Match_
- _If-Modified-Since_
- _In-None-Match_
- _If-Range_
- _If-Unmodified-Since_
- _Max-Forwards_
- _Proxy-Authorization_
- _Range_
- _Referer_
- _TE_
### _An optional request body_
- _Request body may either be in the form of XML or JSON

### HTTPS Response
1. A status.
2. Collection of Headers.
3. A Body.

### RestAssured without Static imports
```Java
import org.testng.Assert;
import org.testng.annotations.Test;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.response.ValidatableResponse;
import io.restassured.specification.RequestSpecification;

public class WithoutBDDStyle {

static RequestSpecification requestSpecification;
static Response response;
static ValidatableResponse validatableResponse;

@Test
public void oldMethodOfRestAssured() {
RestAssured.baseURI = "http://dummy.restapiexample.com/api/v1/employees";
// Create a request specification
requestSpecification = RestAssured.given();
// Calling GET method
response = requestSpecification.get();
// Let's print response body.
System.out.println(response.prettyPrint());
// Validate Response
validatableResponse = response.then();
// Get status code
validatableResponse.statusCode(200);
// Check status line is as expected
validatableResponse.statusLine("HTTP/1.1 200 OK");
}

@Test
public void oldMethodOfRestAssuredUsingTestNG() {
RestAssured.baseURI = "http://dummy.restapiexample.com/api/v1/employees";
// Create a request specification
requestSpecification = RestAssured.given();
// Calling GET method
response = requestSpecification.get();
// Let's print response body.
System.out.println(response.prettyPrint());
// Get status line
Assert.assertEquals(response.getStatusLine(), "HTTP/1.1 200 OK");
// Get status code
Assert.assertEquals(response.getStatusCode(), 200);
}
}
```

### RestAssured withStatic imports BDD style

### Example
- _**Resource URL:** https://bookstore.toolsqa.com/_
- _**Parameter:** BookStore/v1/Books_

### Characteristics of REST
- Uniform interface
- Client Server separation
- Stateless
- Layered System
- Cacheable
- Code-on-demand(Eg - Flash Video Player)

### Rest API Connectors
1. _**Client** 
2. _**Server** 
3. _**Cache** 
4. _**Resolver** 
5. _**Tunnel** 

### Components in Rest 
1. _**Origin Server** 
2. _**User Agent** 
3. _**Gateway** 
4. _**Proxy** 

### Rest Data Elements
1. _**Resource**_
2. **Resource Identifier**(URI)
3. **Resource Metadata**
4. **Representation** (Entire Request or Response)
5. **Representation Metadata**(Headers- _**content-type**_, _**content-length**_, _**User-Agent, Connection, Accept-Encodin**_)

Query Parameter
And Path Parameter
JsonPath 
XmlPath

### Create Json Object with Json Simple
```xml
<!-- https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple -->
<dependency>
    <groupId>com.googlecode.json-simple</groupId>
    <artifactId>json-simple</artifactId>
    <version>1.1.1</version>
</dependency>

```

```java
JSONObject requestParams = new JSONObject(); 
requestParams.put("userId", "TQ123"); 
requestParams.put("isbn", "9781449325862"); 
JSONObject.toJSONString()
request.header("Content-Type", "application/json"); 
request.body(requestParams.toJSONString());
```

### Serialization 
Serialization is a process where you convert an Instance of a Class (_Object of a class_) into a Byte Stream. This Byte Stream can then be stored as a file on the disk or can also be sent to another computer via the network. Deserialisation in Opposite of Serialization.

![Serialization](https://www.toolsqa.com/gallery/Rest%20Assured/1.Serialization%20and%20Deserialization%20in%20Java.png)
```Java
ObjectOutputStream o = new ObjectOutputStream(new FileOutputStream("//File Name"));

Animal animal = new Animal("Cow");

o.writeObject(animal);
o.close();
```
### Deserialization
```java
FileInputStream fileStream = new FileInputStream(new File(fileName));
ObjectInputStream objectStream = new ObjectInputStream(fileStream);
Object deserializeObject = objectStream.readObject();
objectStream.close();
fileStream.close();
```

### Authentication 
- Being able to authenticate with Credentials
### Basic Authentication(Auth)
- Does using Authentication headers. ie username and Password is sent in the URL.
```Java
given().auth().basic("your username", "your password").get("your end point URL");
```
[Challenge Response Mechanism](https://datatracker.ietf.org/doc/html/rfc2617#section-1.2)
This means that it waits for the server to challenge rather than send the credentials directly.
```java
given().auth().preemptive().basic("your username", "your password").get("your end point URL");
```

### Digest Authentication
It uses a digestive key in subsequent requests. If at all it is intercepted by an eavesdropper, he will get access only to the transaction performed and not the user password.
```java
given().auth().digest("your username", "your password").get("your end point URL")
```

### Form Authentication 
```java
given() .auth().form("your username", "your password").post("your end point URL")
```

```java
given().auth().form("your username", "your password", new FormAuthConfig("/perform_signIn","user","password"))
```

### OAuth Authentication
```java
//Oauth 1
given().auth().oauth(consumerKey, consumerSecret, accessToken, tokenSecret).get("your end point URL")
// Oauth 2 
given().auth().oauth2("Access token").get("your end point URL")
```
### Authorisation 
- Being able to provide valid access. ie (Admin and Employee users )

### Put Request
**OST request**

- 201 with a location header pointing to the new resource.
- 400 if the new item is not created.

**PUT request**

- 204 for OK/SUCCESS (but no content).
- 200 for OK with Content Body (Updated response).
- 400 if the data sent was invalid.
https://toolsqa.com/rest-assured/put-request-using-rest-assured/

### To Be continued
https://toolsqa.com/rest-assured/delete-request-using-rest-assured/
https://qaautomation.expert/2023/10/12/rest-assured-tutorials/
### Jira Practice Api's

[Jira Api's for practice](https://developer.atlassian.com/server/jira/platform/rest-apis/)

[Jira Docker Image](https://hub.docker.com/r/atlassian/jira-software)

[Cookie-based authentication Api](https://developer.atlassian.com/server/jira/platform/cookie-based-authentication/)

[API Reference](https://docs.atlassian.com/jira-software/REST/9.11.0/)

Session Filter explanation 

Attachment and Multipart upload 

Extract Response as using extract().asString()

HTTPs relaxed https certifications

### OAath 2.0
Access token clinet ID , google sign in 
Grant type(autherisation code and client credentials)

1. Hitting the Access Code URL and getting the access code 
2. Hitting the Access Token URL and getting the Access Token 
3. Hitting the actual request with the access token


![[Pasted image 20231123100710.png]](/static/Pasted image 20231123100710.png)

TOken in Response 
![[Pasted image 20231123101213.png]](/static/Pasted image 20231123101213.png)

![[Pasted image 20231123101952.png]](/static/Pasted image 20231123101952.png)

![[Pasted image 20231123102141.png]](/static/Pasted image 20231123102141.png)
![[Pasted image 20231123124455.png]](/static/Pasted image 20231123124455.png)
![[Pasted image 20231123102325.png]](/static/Pasted image 20231123102325.png)
![[Pasted image 20231123102358.png]](/static/Pasted image 20231123102358.png)

![[Pasted image 20231123103612.png]](/static/Pasted image 20231123103612.png)
Access Code

![[Pasted image 20231123123202.png]](/static/Pasted image 20231123123202.png)

Access Token 

![[Pasted image 20231123123433.png]](/static/Pasted image 20231123123433.png)

Actual Request
![[Pasted image 20231123123315.png]](/static/Pasted image 20231123123315.png)


Client Credential 

![[Pasted image 20231123124427.png]](/static/Pasted image 20231123124427.png)

![[Pasted image 20231123124636.png]](/static/Pasted image 20231123124636.png)
```Link
https://qaautomation.expert/2023/10/12/rest-assured-tutorials/
```


### Serialisation and Deserialisation using POJO

![[Pasted image 20231123152504.png]](/static/Pasted image 20231123152504.png)
![[Pasted image 20231123162831.png]](/static/Pasted image 20231123162831.png)

### Request Response Spec Builder
![[Pasted image 20231123180330.png]](/static/Pasted image 20231123180330.png)

![[Pasted image 20231123180618.png]](/static/Pasted image 20231123180618.png)

### JWT token RestAssured 
### Form data 
![[Pasted image 20231123222103.png]](/static/Pasted image 20231123222103.png)
![[Pasted image 20231123222155.png]](/static/Pasted image 20231123222155.png)

Using Rest Assured 
![[Pasted image 20231123223410.png]](/static/Pasted image 20231123223410.png)

![[Pasted image 20231123223744.png]](/static/Pasted image 20231123223744.png)

Loggig 
![[Pasted image 20231124153450.png]](/static/Pasted image 20231124153450.png)
### Rest Assured Framework



### Dependency
1. Rest Assured dependency includes JsonPath and XmlPath
2. Rest Assured's dependency declaration comes before (JUnit or TestNG) dependency to make sure that the correct version of Hamcrest is used 

   - JsonPath: Used for parsing and extracting data from JSON responses.
   - XmlPath: Used for parsing and manipulating XML responses.
   - Hamcreast is used for assertions.
   - json-schema-validator is used for validating Json Schema
   Jacson 
   Gson

### Static Imports
```Java
import io.restassured.RestAssured.*;
import io.restassured.matcher.RestAssuredMatchers.*;
import org.hamcrest.Matchers.*;
import io.restassured.module.jsv.JsonSchemaValidator.*;

```

## Robot Framework

- [Getting Started guide](https://docs.robotframework.org/docs)
- [Reference Documentation](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)
### Installation
```Python
cd ~/MyProject
pyenv global 3.10.6 # use specific python version 
pyenv local 3.10.6 
# Create Environment
python -m venv .venv
# Activate Environment
source .venv/bin/activate
# deactivate Environment
source .venv/bin/deactivate
```

### Poetry Maven for Python
- [Introduction](https://python-poetry.org/docs/)
- [Poetry Commands](https://python-poetry.org/docs/cli/)

Poetry is a tool for **dependency management** and **packaging** in Python. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you. Poetry offers a lockfile to ensure repeatable installs, and can build your project for distribution.

```Python
pipx install poetry # Install Poetry
poetry new poetry-demo # Create Poetry Project
poetry run # runnning files ising poetry 
poetry init # Make a folder poetry project
poetry shell # installs dependencies and activates environment
deactivate # when run in poetry shell deactivates the evironment
exit # Removes the poetry shell
poetry build
```

### UI Libraries
- [Selenium Library](https://github.com/robotframework/SeleniumLibrary/)
	- [explicit locator strategy](https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html#Explicit%20locator%20strategy) or [implicit XPath strategy](https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html#Implicit%20XPath%20strategy),
	- Chaining locators ie: css:.bar >> [xpath://a](xpath://a)
	
In Robot Framework, which is a keyword-driven test automation framework, you can use SeleniumLibrary to interact with web browsers, and when dealing with web elements, locators play a crucial role. Chaining locators in Robot Framework with SeleniumLibrary allows you to create more specific and flexible locators by combining multiple locator strategies.

Here's an example to illustrate chaining locators in Robot Framework using SeleniumLibrary:

```robot
*** Settings ***
Library           SeleniumLibrary

*** Test Cases ***
Chaining Locators Example
    Open Browser    https://example.com    chrome
    ${element}=    Chain Locators    css:div#container    xpath://a[@id='link']
    Click Element    ${element}
    Capture Page Screenshot
    Close Browser
```

In this example:

1. `Open Browser` opens the Chrome browser and navigates to the specified URL.
2. `Chain Locators` is used to create a more specific locator by chaining two locators together. The first part of the chain is a CSS locator (`css:div#container`), and the second part is an XPath locator (`xpath://a[@id='link']`). The resulting `${element}` will be a combination of these locators.
3. `Click Element` uses the `${element}` locator to click on the specific element on the web page.
4. `Capture Page Screenshot` takes a screenshot for verification purposes.
5. `Close Browser` closes the browser.

This is just a basic example, and you can chain different types of locators based on your needs. Keep in mind that while chaining locators can be powerful, it's essential to ensure that the combined locators uniquely identify the desired element on the web page. Additionally, consider the maintainability of your tests, as overly complex locators can make your test scripts harder to understand and maintain.

- [Browser Library](https://github.com/MarketSquare/robotframework-browser)

### Rest Libraries
- [Requests Library](https://github.com/MarketSquare/robotframework-requests)

### Desktop Libraries 
- [FlaUI](https://github.com/GDATASoftwareAG/robotframework-flaui)
- [Sikuli Library](https://github.com/rainmanwy/robotframework-SikuliLibrary)
- [White Library](https://github.com/Omenia/robotframework-whitelibrary)
- [RPA Framework](https://rpaframework.org/)
- [ImageHorizon Library](https://github.com/eficode/robotframework-imagehorizonlibrary)
- [Zoomba Library](https://github.com/Accruent/robotframework-zoomba)
- [AutoIT Library](https://github.com/nokia/robotframework-autoitlibrary)
- - [RemoteSwing Library](https://github.com/robotframework/remoteswinglibrary)
- [Swing Library](https://github.com/robotframework/SwingLibrary/wiki)
- [Eclipse Library](https://github.com/lcarbonn/robotframework-eclipselibrary)
- [RPA Framework JavaAccessBridge](https://rpaframework.org/libraries/javaaccessbridge/index.html)

### Mobile Libraries
- [Appium Library](https://docs.robotframework.org/docs/different_libraries/appium)

### Database Library
- [Database Library](https://docs.robotframework.org/docs/different_libraries/database)

### Standard Library 
- [Standard Library](https://docs.robotframework.org/docs/different_libraries/standard)

### Project Structure
- `pyproject.toml` - Python dependencies
- `Readme.md` - Project description
- `.gitignore` - Lists files and folders to be ignored by git
- `tests/` - Test Suites folder
     `search.robot` - Test Suite for Search functionality
     `login.robot` - Test Suite for Log In functionality
     `checkout/` - Folder containing Test Suites for Checkout
         `checkout_basic.robot` - Test Suites for standard Checkout
         `checkout_premium.robot` - Test Suites for premium Checkout
- `resources/` - Reusable keywords
     `common.robot` - General Keywords (e.g. Login/Logout, Navigation, ...) are stored here
     `search.robot` - Keywords for searching are stored here
     `utils.py` - Python helper keywords are stored here

### my_project Structure
```bash
├── tests
│   ├── suiteA.robot
│   ├── suiteB.robot
│   ├── ...
│   
├── resources
│   ├── common.resource
│   ├── some_other.resource
│   ├── custom_library.py
│   ├── variables.py
│   ├── ...
│
├── .gitlab-ci.yml
├── .gitignore
├── README.md
├── requirements.txt
```

### Import custom keywords
*** Settings ***
Resource  resources/common.resource
Resource  resources/some_other.resource
Library   resources/custom_library.py
Variables resources/variables.py
...

### Running Python Tests
```Python
robot --pythonpath . tests/suiteA.robot
```
### Using `PYTHONPATH` environment variable
```bash
$ export PYTHONPATH=$PYTHONPATH:.
$ robot tests/suiteA.robot
```

### File and Folders
- A test case file automatically creates a [test suite](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-test-suites) containing the test cases in that file.
- [Test libraries](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#using-test-libraries) containing the lowest-level keywords.
- [Resource files](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#resource-files) with [variables](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#variables) and higher-level [user keywords](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-user-keywords).
- [Variable files](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#variable-files) to provide more flexible ways to create variables than resource files.

### Robot Documentation using RestructuredText
- .robot, rst extension can be used to create restructured text
```Python
reStructuredText example
------------------------

This text is outside code blocks and thus ignored.

.. code:: robotframework

   *** Settings ***
   Documentation    Example using the reStructuredText format.
   Library          OperatingSystem

   *** Variables ***
   ${MESSAGE}       Hello, world!

   *** Test Cases ***
   My Test
       [Documentation]    Example test.
   Log    ${MESSAGE}
   My Keyword    ${CURDIR}

   Another Test
   Should Be Equal    ${MESSAGE}    Hello, world!

Also this text is outside code blocks and ignored. Code blocks not
containing Robot Framework data are ignored as well.

.. code:: robotframework

   # Both space and pipe separated formats are supported.

   | *** Keywords ***  |                        |         |
   | My Keyword        | [Arguments]            | ${path} |
   |                   | Directory Should Exist | ${path} |

.. code:: python

   # This code block is ignored.
   def example():
       print('Hello, world!')
```

### Variables
_1. **Scalar** (Identifier: $)_ – The most common way to use variables in Robot Framework test data is using the scalar variable syntax like **${var}**. When this syntax is used, the variable name is replaced with its value as-is.

_2. **List** (Identifier: @)_ – If a variable value is a list or list-like, a list variable like **@{EXAMPLE}** is used. In this case, the list is expanded, and individual items are passed in as separate arguments.

_3. **Dictionary** (Identifier: &)_ – A variable containing a Python dictionary or a dictionary-like object can be used as a dictionary variable like **&{EXAMPLE}**. In practice, this means that the dictionary is expanded and individual items are passed as named arguments to the keyword.

_4. **Environment** (Identifier: %)_ – Robot Framework allows using environment variables in the test data using the syntax **%{ENV_VAR_NAME}**. They are limited to string values.
```Python
`*** Variables ***`

`${STRING}           cute name                #Scalar`

`${INT_AS_STRING}`    `1`                     `#Scalar`

`${INT_AS_INT}       ${``1``}                    #Scalar`

`${FLOAT}            ${``3.14``}                   #Scalar`

`@{LIST}             one    two    three`

`&{DICTIONARY}       string=name`    `int``=${``1``}    list=@{LIST}`

`${ENVIRONMENT}      %{PATH}`
```

##  Jira

### Agile Projects
![Agile Project](/static/AgileProject.png)

### Agile Workflow
![Agile Workflow](/static/AgileWorkflow.png)

### Agile Key points 
1. Interaction over tools. 
2. working software over documentation.
3. Customer collaboration over budget negotiation.
4. Responding to change as per plan changes.
5. Delivering software quickly in incremental model.
6. Business folks and Developer works closely.

### Sprint Artifacts
1. Product Backlog
2. Sprint Backlog
3. Burn down chart

### Sprint Ceremonies 
1. Sprint Planning
2. Daily Scrum Meeting
3. Sprint Review
4. Sprint Retro

### Kanban vs Scrum 
1. No Sprint backlog in Kanban
2. There is no process in Kanban 
3. Scrum has a fixed timeline

### Issue WorkFlow 
1. New 
2. InProgress
3. Done

### Issue Estimates
1. by hours 
2. by story points

### Jira Roles 
1. Global
2. Project Specific roles

### Createing custom issue type called scheme
### Createing custom fileds 
### Createing custom workflows
### Default Assignee can be set too
### Componenets can be created to device the responsibility to specific team (Its exactly like a configuration Item)

### Edge Test cases
1. Out of the box test cases

### Jira Introduction

1. Bug Tracking
2. Issue Tracking
3. Project Management
4. Requirements Management
5. HelpDesk
6. Generate Reports
7. Customised Issues 
8. Customs Notifications
9. Powerfull Search functionality
10. Extensible

### Waterfall Project

![Waterfall](/static/Waterfall.png)

### Waterfall key points
1. Time to market is high
2. Final application might not be what customer wanted. 
3. Changing the requirements midway is difficult.
4. Not suitable for project where requirements keeps on changing.
5. Better Documentation.

### Issue WorkFlow 
1. New 
2. Work

### Issue Estimates
1. by hours 
2. by story points

### Roles 
1. Global
2. Project Specific roles

### Createing custom issue type called scheme
### Createing custom fileds 
### Createing custom workflows
### Default Assignee can be set too
### Componenets can be created to device the responsibility to specific team (Its exactly like a configuration Item)

### Edge Test cases 

### Jira Introduction

1. Bug Tracking
2. Issue Tracking
3. Project Management
4. Requirements Management
5. HelpDesk
6. Generate Reports
7. Customized Issues 
8. Custome Notifications
9. Powerfull Search functionality
10. Extincible

xray 
zaphyr

----

   AGILE + JIRA :
Agenda:
Tester/Developer day to day role in Agile Scrum Projects
How to Use Jira tool for Project Management and its related activities

We shall assume Credit card online Banking Application to Demonstrate above topics

Features to Develop:
	•	Develop Login Module
	•	Credit card Dashboard 
	•	Profile

Install Jira into Machines

	•	What Constitutes Agile Team?
Product owner,Scrum Master, Development team(Dev,QA,BA)
	•	Create Scrum Project in Jira.
	•	what is epic? An epic user story is a large that cannot be delivered as defined within a single iteration or is large enough that it can be split into smaller user stories
	•	What is User story?
	•	A user story is the smallest unit of work in an agile framework.
	•	Epics are large work items broken down into a set of stories, 
	•	The purpose of a user story is articulate how a piece of work will deliver a particular value back to the customer.
	•	User stories are a few sentences in simple language that outline the desired outcome
	•	Requirements are added later, once agreed upon by the team.
	•	User stories are often expressed in a simple sentence, structured as follows:

“As a [persona], I [want to], [so that	
How to create Stories and Epics in JIRA?
What are components and how to create them in JIRA?
What are release versions?

What is backlog refinement/Grooming? And how it is done?
1 week before sprint starts
Have it in the middle of sprint and make stories for next sprint
1 week before Sprint 2 starts 
	•	How to define Acceptance criteria to Story?
	•	Create SubTasks for Story
	•	Size the story based on its complexity

	•	what is Sprint?
25 userstories to complete login epic
2 months – 6 Sprints
Sprint duration of 10days: 5 user
Sprint 2: 5 us
SPrin3 : 5us
Sprint 4 : 5
Sprint 5 : 5
Sprint 6 : Regression testing 

	•	What is Sprint planning?
Sprint starts :Tuesday 

	•	Exploring Scrum Board 
	•	Daily Stand ups.
	•	How story will undergo different status and get closed?
	•	Reports after Sprint is completed.

info@qaclickacademy.com

       Reporting Bugs in Jira
	•	Retrospective
What went well in this sprint
What did not go well in this sprint
Grooming 
	•	Kanban Board

---
Software Testing Life Cycle – STLC
Testing is not only limited just to find bugs but has a wider scope and is required
right from the beginning of the project when the requirements are not even
finalized.
Since testing is also standardized. Just like development of software has a lifecycle,
Testing too has a lifecycle
Requirement Analysis
The QA team will interact with various stakeholders (Client, Business Analyst,
Technical Leads, System Architects etc.) to understand the requirements in detail.
Test Planning
Test Planning is most important phase of Software testing life cycle where all testing strategy is
defined.
How to prepare Test Plan & Strategy?
Test Case Development:
This is the phase of STLC where testing team write down the detailed test cases. Along with test
cases testing team also prepare the test data if any required for testing. Once the test cases are
ready then these test cases are reviewed by peer members or QA lead.
Also, the Requirement Traceability Matrix (RTM) is prepared. The Requirement Traceability
Matrix is an industry-accepted format for tracking requirements where each test case is
mapped with the requirement. Using this RTM, we can track backward & forward
traceability.
Test Environment Setup
Test environment decides the software and hardware conditions under which a work product is
tested. Test environment set-up is one of the critical aspects of testing process
Test Execution
During this phase, the testers will carry out the testing based on the test plans and the test
cases prepared. Bugs will be reported back to the development team for correction and
retesting will be performed.
Test Closure Activities
Test closure activities are done mostly after the product is delivered
Test closure activities mainly comprise of four types:
Ensure Test Completion
Handover Test Artifacts
Project Retrospectives
Archive Test Work Products
What is Test Plan?
Test plan is a document which contains the plan related to all testing activities which needs to
be done to deliver a quality product.
This document is prepared after analyzing Business requirements of the Project
It is usually prepared by the Test Lead or Senior QA in Agile team
The focus of the document is to describe
what to test, (In Scope for testing)
what cannot be tested,
Tools used for Testing, Environments/Infrastructure required to Test
Staffing and Training Needs
Testing Duration
Risks and contingencies plan
Business Requirements:
Req 1: Submit the Form
Req 2: Navigate to the tabs present on home page
Req 3: select the products and add to cart
Req 4: Added items in cart should display in Checkout page
Req 5: Select the country to deliver before Purchase
Req 6: Complete purchase by providing payment details and generate receipt

##  Testing
### Ad-hoc Testing
- **Purpose:** Ad-hoc testing is an informal, unscripted approach to testing where testers explore the application without any predefined test cases or plans. The primary goal is to find defects and understand the system's behavior quickly.
- **Scope:** Ad-hoc testing is not structured and does not follow a specific test script or test case. Testers rely on their experience and intuition to uncover issues in the software.
- **Execution Time:** Ad-hoc testing can be performed at any stage of the testing process. It is often used for quick, unplanned checks to identify issues that might have been missed during structured testing.

### Exploratory Testing
- **Purpose:** Exploratory testing is a testing approach where testers simultaneously design and execute test cases based on their real-time understanding of the application. It is a dynamic and flexible way of exploring the software.
- **Scope:** In exploratory testing, testers create test cases on the fly, using their domain knowledge and experience to investigate the application thoroughly. The focus is on uncovering defects, understanding the system's behavior, and identifying risks.
- **Execution Time:** Exploratory testing can be performed throughout the testing process. Testers adapt their testing approach based on what they discover as they explore the application.

In summary, both ad-hoc testing and exploratory testing are unscripted, informal testing approaches that rely on the tester's intuition and experience. Ad-hoc testing is often unplanned and used to quickly identify issues, while exploratory testing is a more structured approach where testers design and execute test cases in real-time to gain a deeper understanding of the software's behavior and uncover defects.


### Black Box Testing
- **Purpose:** Black Box Testing is a testing approach that focuses on evaluating the functionality of a software application without examining its internal code, structure, or logic. Testers treat the software as a "black box" and assess it based on its inputs, outputs, and behavior.
- **Scope:** Black Box Testing is concerned with testing the software from the user or end-user perspective. It assesses whether the software functions as expected and delivers the desired results without understanding the internal workings.
- **Test Cases:** Test cases in black box testing are designed based on requirements, specifications, or user stories. Testers validate that the software performs the correct functions and produces the expected outputs.
- **Types:** Common types of black box testing include Functional Testing, Non-Functional Testing (e.g., usability, performance, security), and Acceptance Testing.

### White Box Testing
- **Purpose:** White Box Testing, also known as Glass Box Testing or Structural Testing, examines the internal structure, code, and logic of the software application. Testers assess how well the code is written and whether it meets coding standards and design specifications.
- **Scope:** White Box Testing focuses on the internal workings of the software, including code paths, statements, and data flows. Testers assess the logical aspects of the software to identify coding errors, vulnerabilities, and areas that need improvement.
- **Test Cases:** Test cases in white box testing are designed based on knowledge of the internal code structure. Testers assess code coverage, branch conditions, and logical paths to ensure thorough testing of the software's logic.
- **Types:** White Box Testing includes techniques like Statement Coverage, Branch Coverage, Path Coverage, and Code Review.

### Key Differences
- Black Box Testing assesses the software's functionality from a user's perspective, while White Box Testing examines the internal code and structure of the software.
- Black Box Testers do not need knowledge of the internal code, whereas White Box Testers require in-depth knowledge of the code to design test cases.
- Test cases in Black Box Testing are based on requirements and specifications, while test cases in White Box Testing focus on code coverage and logical paths.
- Both types of testing are essential, with Black Box Testing ensuring that the software meets user requirements and White Box Testing verifying the quality of the code and logic.

In summary, Black Box Testing evaluates the functionality of the software without considering its internal code, while White Box Testing examines the internal structure, logic, and code of the software to ensure it is well-structured and adheres to coding standards. Both types of testing are integral to ensuring software quality and reliability.


### Component vs Integration Testing

Integration Testing and Component Testing are two essential levels of testing in the software development process, each with a specific focus and purpose. Here are notes on both integration testing and component testing:

**Component Testing:**
- **Purpose:** Component Testing, also known as Unit Testing, focuses on testing individual software components or units in isolation to verify their correctness and functionality.
- **Scope:** Component Testing is concerned with testing a specific module, class, or function without considering its interactions with other parts of the system.
- **Test Cases:** Test cases in component testing are designed to test the smallest units of code, ensuring that they produce the expected results when provided with specific inputs.
- **Environment:** Component testing typically takes place in a controlled and isolated development or testing environment.
- **Testing Tools:** Automated testing tools are often used to run unit tests to validate the behavior of code components.
- **Benefits:** Component testing helps identify and fix bugs at an early stage, ensuring that individual code units work correctly. It is essential for maintaining code quality.

**Integration Testing:**
- **Purpose:** Integration Testing is focused on verifying that multiple software components or modules work correctly when combined or integrated. It ensures that the interactions between components do not introduce defects.
- **Scope:** Integration Testing examines the interaction between various modules, subsystems, or components to verify that they function as a cohesive whole.
- **Test Cases:** Test cases in integration testing are designed to assess the interfaces and interactions between components, testing how data and control flow between them.
- **Environment:** Integration testing often requires a more comprehensive testing environment that simulates the entire system or at least a substantial portion of it.
- **Types:** Common types of integration testing include Top-Down Integration, Bottom-Up Integration, and Big Bang Integration, each focusing on a different approach to integrating components.
- **Benefits:** Integration testing helps identify issues related to component interactions, such as data flow, interface mismatches, and communication problems. It ensures that the integrated system behaves as expected.

**Key Differences:**
- Component testing evaluates individual code components in isolation, while integration testing assesses the interactions and interfaces between these components.
- Component testing is typically conducted by developers during the coding phase, while integration testing is performed as part of the broader testing process.
- Component testing helps ensure that the building blocks of the software are sound, while integration testing ensures that these building blocks work together harmoniously.

In summary, component testing focuses on individual code units, ensuring their correctness and functionality, while integration testing verifies that multiple components interact correctly when integrated into a larger system. Both types of testing are critical for ensuring that a software system operates as intended.


### Defect LifeCycle

The Defect Lifecycle, also known as the Bug Lifecycle or Issue Lifecycle, outlines the stages a defect or issue goes through from its discovery to its resolution. Understanding this lifecycle is crucial for efficient defect management. Here are notes on the typical stages of the Defect Lifecycle:

**1. Defect Identification:**
- **Discovery:** A defect is discovered during testing, user feedback, or any phase of software development.
- **Logging:** The defect is logged in a defect tracking system, often referred to as a bug tracking tool or issue tracking tool. It includes details like the defect's description, steps to reproduce, and its severity.

**2. Defect Triage:**
- **Assessment:** The defect is assessed to determine its validity and severity. It may be assigned a priority based on its impact on the software.
- **Assignment:** The defect is assigned to the responsible individual or team (usually a developer or tester) who will investigate and address it.

**3. Defect Resolution:**
- **Investigation:** The assigned person investigates the defect to understand its root cause. This may involve reviewing code, system logs, and relevant documents.
- **Fixing:** Once the cause is identified, the developer fixes the defect by modifying the code, configuration, or other relevant aspects.
- **Verification:** The tester verifies the fix by retesting the software to ensure that the defect is resolved.
- **Validation:** The defect is validated to ensure that the fix does not introduce new issues or negatively impact other parts of the software.

**4. Defect Closure:**
- **Documentation:** If the defect is fixed and verified successfully, it is marked as "closed" in the defect tracking system. This includes documenting details of the fix and verification.
- **Closure Report:** A closure report may be generated, summarizing the defect's history and resolution, to help in knowledge sharing and future reference.

**5. Defect Reopening (if necessary):**
- **Rejection:** If the defect reappears or is not fixed correctly, it may be reopened with detailed information about the regression.
- **Repeat Process:** The defect is reassigned for investigation, fixing, and retesting. The lifecycle stages may be repeated until the defect is finally resolved and verified.

**6. Defect Reporting:**
- **Communication:** The status of defects and their resolutions are communicated to relevant stakeholders, including project managers, developers, testers, and other team members.

**Key Points:**
- Defects may vary in severity, priority, and complexity, which impacts the time they spend in each lifecycle stage.
- A well-organized defect tracking system and effective communication are essential for managing defects throughout their lifecycle.
- Documentation is crucial at each stage to maintain a record of the defect's history and resolution.

In summary, the Defect Lifecycle ensures a systematic approach to managing defects, from their identification to their resolution and closure. This process helps maintain software quality and provides transparency in defect management.


### Functional vs Non Functional

Functional Testing and Non-Functional Testing are two essential categories of software testing, each serving a distinct purpose. Here are notes about both types of testing:

### Functional Testing
- **Purpose:** Functional Testing is focused on verifying that the software's functions work as intended and conform to the specified requirements. It aims to ensure that the system performs its intended operations correctly.
- **Scope:** Functional Testing tests the application's features, such as user interfaces, data processing, business logic, and functionality. It is concerned with "what" the software should do.
- **Test Cases:** Test cases in functional testing are designed based on the functional specifications and use cases, checking whether the software meets the expected behavior and produces correct outputs.
- **Types:** Common types of functional testing include Unit Testing, Integration Testing, System Testing, and Acceptance Testing. Each type of functional testing covers different levels of the application, from individual units to the entire system.

### Non-Functional Testing
- **Purpose:** Non-Functional Testing focuses on evaluating the non-functional aspects of software, such as performance, usability, security, and reliability. It assesses how well the system performs its operations under different conditions.
- **Scope:** Non-Functional Testing addresses "how" the software operates, considering attributes like speed, efficiency, user experience, security, and scalability.
- **Test Cases:** Test cases in non-functional testing are designed to measure and assess the qualities mentioned above. These test cases do not typically involve functionality but rather focus on metrics and characteristics of the software.
- **Types:** Non-Functional Testing includes various types, such as Performance Testing (including load, stress, and scalability testing), Usability Testing, Security Testing, Reliability Testing, and Compatibility Testing. Each type assesses specific non-functional attributes of the software.

### Key Differences
- Functional testing ensures that the software performs its intended functions correctly, while non-functional testing assesses how well the software operates under various conditions.
- Functional testing focuses on specific features and functionality, while non-functional testing evaluates characteristics like performance, security, and user experience.
- Test cases in functional testing check what the software should do, while test cases in non-functional testing assess how well it does it.
- Both types of testing are essential for comprehensive quality assurance, as they ensure that the software not only functions correctly but also meets the necessary performance, security, and user experience standards.

In summary, functional testing concentrates on the features and functionality of the software, whereas non-functional testing evaluates non-functional attributes like performance, usability, and security. Both types of testing are vital to ensuring that the software meets user expectations and quality standards.


### Load vs Stress Testing

### Load Testing:
- **Purpose:** Load Testing is a type of performance testing that assesses how a system or application performs under normal or expected load conditions.
- **Scope:** It involves testing the system with a specific load level that simulates typical user activity and usage patterns.
- **Objectives:** The primary goal of load testing is to ensure that the system can handle its expected load without performance degradation.
- **Test Conditions:** Load tests may include concurrent user actions, data input, or transaction processing typical of regular system usage.
- **Performance Metrics:** Load testing measures performance indicators such as response times, throughput, and resource utilization.
- **Benefits:** Load testing helps identify performance bottlenecks and capacity limitations, allowing for optimization before deployment.

### Stress Testing:
- **Purpose:** Stress Testing is a type of performance testing that evaluates how a system behaves under extreme conditions, beyond its normal operational limits.
- **Scope:** It involves testing the system with higher-than-expected load levels or by deliberately overloading it.
- **Objectives:** The primary goal of stress testing is to identify the system's breaking point or to observe how it behaves under exceptional conditions.
- **Test Conditions:** Stress tests may include sudden spikes in user activity, excessive data loads, or resource exhaustion scenarios.
- **Performance Metrics:** Stress testing may focus on assessing the system's behavior during and after a stress event, looking for issues like crashes or data corruption.
- **Benefits:** Stress testing helps identify vulnerabilities and weaknesses in the system, enabling proactive mitigation and disaster recovery planning.

### Key Differences:
- Load testing assesses how a system performs under expected or typical load conditions, while stress testing evaluates its behavior under extreme and abnormal conditions.
- Load testing is primarily concerned with ensuring performance under normal user activity, while stress testing seeks to find the system's limits and how it behaves when those limits are exceeded.
- Load testing helps optimize the system for expected traffic, while stress testing helps identify vulnerabilities and weaknesses in the face of unexpected events or extreme usage.

In summary, load testing ensures that a system can handle typical loads, while stress testing explores how the system behaves under extreme conditions or unexpected events. Both types of testing are essential for assessing a system's robustness and performance under different scenarios.


### Priority vs Severity


### Bug
- **Priority (Bug):** Priority for a bug determines the order in which the bug should be fixed, based on its importance and impact. For example, "High" priority bugs need to be addressed immediately, "Medium" priority bugs can be addressed after high-priority ones, and "Low" priority bugs can be deferred.
- **Severity (Bug):** Severity characterizes the seriousness of the bug, taking into account its potential impact on the system or users. For instance, "Critical" severity bugs are show-stoppers that render the system unusable, "Major" severity bugs significantly affect functionality, and "Minor" severity bugs have minimal impact.

### Test Case
- **Priority (Test Case):** Priority for a test case determines the order in which the test case should be executed during testing. "High" priority test cases are executed early to verify critical functionalities, "Medium" priority test cases are important but not critical, and "Low" priority test cases are executed later for less critical features.
- **Severity (Test Case):** Severity for a test case characterizes the criticality of the scenario it covers. "Critical" severity test cases are essential for the system to function properly, "Major" severity test cases are important but not show-stoppers, and "Minor" severity test cases cover non-critical or cosmetic aspects.

### User Story (Agile Development):
- **Priority (User Story):** Priority for a user story in an Agile context determines its importance and order in the product backlog. It guides the development team on which stories to work on next. For example, "High" priority user stories are essential for the next sprint, "Medium" priority stories are important but not urgent, and "Low" priority stories can be addressed later.
- **Severity (User Story):** In the context of user stories, severity might not be a commonly used term. Instead, user stories often focus on the value they bring to the user or the business, which can be labeled as "High Value," "Medium Value," or "Low Value."

In Agile development, user stories are typically prioritized based on business value, customer needs, and other factors, and the concept of severity is not as relevant as in the context of testing. However, user stories can still be assigned a priority to determine their order of implementation in an Agile backlog.

### Retesting vs Regression Testing


### Retesting
- **Purpose:** Retesting is a type of testing that focuses on verifying that a specific defect, which was found and fixed in a previous testing phase, has been successfully rectified. The primary goal is to ensure that the reported issue no longer exists.
- **Scope:** Retesting is narrow in scope and typically involves executing the same test cases that initially revealed the defect. It doesn't explore new areas of the application, focusing solely on the fixed issue.
- **Execution Time:** Retesting is performed after the defect has been fixed, and it aims to validate the resolution quickly. It is a targeted and focused activity.

### Regression Testing
- **Purpose:** Regression testing is a testing approach that aims to ensure that recent changes or new features introduced into the software do not adversely affect existing, stable functionalities. It verifies that the application still works as expected after modifications.
- **Scope:** Regression testing is broader in scope and involves re-running a subset of existing test cases (both related to the changes and critical core functionalities) to detect unintended side effects or regressions.
- **Execution Time:** Regression testing is performed whenever there are code changes, new feature additions, or updates to the application. It's an ongoing process throughout the software development lifecycle.

In summary, retesting and regression testing serve different purposes and have distinct scopes. Retesting is specific to validating the resolution of a known defect, while regression testing is a broader, ongoing effort to ensure that new changes do not introduce unintended issues in the existing, stable areas of the application.

### SDLC vs STLC

Software Development Life Cycle (SDLC) and Software Testing Life Cycle (STLC) are two distinct but interconnected processes in the software development and testing industry. Here are notes about both SDLC and STLC:

### Software Development Life Cycle (SDLC)
- **Purpose:** SDLC is a systematic process for planning, designing, developing, testing, and delivering software applications. It provides a structured approach to building software products, ensuring quality and meeting project objectives.
- **Scope:** SDLC encompasses the entire software development process, from initial requirements gathering and design to coding, testing, deployment, and maintenance.
- **Phases:** Common SDLC phases include Requirements Gathering, Planning, Design, Implementation (Coding), Testing, Deployment, and Maintenance.
- **Methodologies:** Various methodologies, such as Waterfall, Agile (e.g., Scrum), and DevOps, define the approach and order of these phases, emphasizing different aspects like sequential planning (Waterfall) or iterative development (Agile).
- **Key Documents:** SDLC produces various documents, including requirement specifications, design documents, codebase, and deployment plans.

![SDLC](/static/SDLC.png)

### Software Testing Life Cycle (STLC)
- **Purpose:** STLC is the process of planning, designing, executing, and evaluating testing activities throughout the software development life cycle. It ensures that software is thoroughly tested to meet quality and performance requirements.
- **Scope:** STLC specifically focuses on the testing phase of SDLC, covering various levels (unit, integration, system, acceptance) and types of testing (functional, non-functional).
- **Phases:** STLC typically consists of phases such as Test Planning, Test Design, Test Execution, Defect Reporting, and Test Closure.
- **Methodologies:** STLC operates within the framework of SDLC methodologies. For instance, in Agile SDLC, testing activities are incorporated into each sprint or iteration.
- **Key Documents:** STLC generates test documentation, including test plans, test cases, test data, defect reports, and test summary reports.

![STCL](/static/STLC.png)

### Key Differences
- SDLC encompasses the entire software development process, while STLC is specifically concerned with testing activities within SDLC.
- SDLC focuses on planning, design, coding, and overall software development, whereas STLC emphasizes testing strategy, test case creation, and test execution.
- SDLC can use various development methodologies (Waterfall, Agile), while STLC adapts to the chosen development methodology, ensuring testing aligns with the development process.
- In SDLC, the end goal is to deliver a working software product, while in STLC, the goal is to verify and validate the quality of the software through comprehensive testing.

### Integration
- STLC is an integral part of SDLC. Testing activities are carried out in parallel with development activities, ensuring that testing is a continuous and concurrent process.
- STLC helps verify that software meets the quality standards set during the development phases of SDLC.

In summary, SDLC represents the entire software development process, while STLC specifically focuses on the testing phase within SDLC. Both are crucial for delivering high-quality software products that meet user requirements and perform reliably.


### Smoke vs Sanity

### Smoke Testing
- **Purpose:** Smoke testing, also known as build verification testing, is a preliminary test that checks whether the software build is stable enough for more comprehensive testing. It helps ensure that the critical functionalities of the application work without major issues.
- **Scope:** Smoke tests cover a basic set of test cases that exercise core features and critical paths of the software. These tests do not aim to explore all functionalities but focus on essential functionality.
- **Execution Time:** Smoke tests are quick to execute and are typically run after a new build is deployed. If a build fails the smoke test, it indicates that there are severe defects that need immediate attention.

### Sanity Testing
- **Purpose:** Sanity testing is a subset of regression testing that focuses on verifying that specific code changes or new features have not adversely affected the existing, stable functionalities of the application. It ensures that the recent modifications have not introduced unexpected issues.
- **Scope:** Sanity tests are narrower in scope than comprehensive regression tests. They concentrate on the areas of the application affected by recent changes or enhancements.
- **Execution Time:** Sanity tests are relatively quick and are typically performed during the later stages of the testing cycle, after more extensive testing has taken place.

In summary, both smoke testing and sanity testing are important types of software testing, but they serve different purposes and are conducted at different stages of the testing process. Smoke testing determines whether a newly built application is fit for further testing, while sanity testing verifies that specific changes or new features have not broken the existing, stable parts of the application. Both testing types are designed to catch critical issues early in the development cycle.

### Test Case vs Scenario vs Step


### Test Scenario
   - Definition: A test scenario is a high-level description of a specific function or feature to be tested.
   - Purpose: Test scenarios provide a broad overview of what needs to be tested without going into detailed steps. They help in understanding the scope of testing for a particular feature.
   - Example: A test scenario for a login feature might be "Verify that users can successfully log in using valid credentials."

### Test Case
   - Definition: A test case is a detailed set of conditions, inputs, and expected results that specify how to test a particular aspect of a software application.
   - Purpose: Test cases are specific and actionable instructions for executing tests. They provide step-by-step guidance to testers to verify whether the software functions correctly.
   - Example: A test case for the login feature mentioned earlier might include steps like "Enter valid username and password" and the expected result of "Successfully logged in."

### Test Step
   - Definition: A test step is a single action or instruction within a test case, defining what the tester needs to do and what is expected to happen.
   - Purpose: Test steps break down a test case into individual, discrete actions. They provide a clear, sequential path for the tester to follow.
   - Example: In the test case for the login feature, each step is a test step. For example, "Enter username" and "Enter password" would be individual test steps within the test case.

### Differences
- Test Scenario is high-level and provides an overview, whereas Test Case is detailed and provides specific steps.
- Test Scenario doesn't include specific instructions or expected outcomes, while Test Case provides precise instructions and expected results.
- Test Case consists of multiple Test Steps, which are individual actions to be performed during testing.
- Test Scenarios are typically used for test planning and requirement analysis, while Test Cases are used for actual testing execution.
- Test Scenarios help in creating an initial test plan, while Test Cases ensure systematic and comprehensive testing of specific functionalities.

In summary, test scenarios help you understand what needs to be tested at a high level, test cases provide the detailed steps and expected results for testing, and test steps break down those test cases into individual actions. All three are essential for effective and structured software testing.


### Test Pyramid
The Test Pyramid strategy is designed to guide software development teams on how to structure their automated testing efforts efficiently by categorizing tests into three layers, forming a pyramid-like shape. The goal is to achieve a balanced approach to testing while ensuring thorough coverage and faster feedback.

The three layers of the Test Pyramid are:

1. Unit Tests (Base of the Pyramid):
   - Unit tests are the foundation of the pyramid and should form the majority of your automated tests.
   - These tests focus on verifying the smallest units of code, such as individual functions or methods.
   - Unit tests are fast to execute, easy to maintain, and provide immediate feedback to developers.
   - They help catch and fix bugs early in the development process, ensuring code correctness at the lowest level.

2. Integration Tests (Middle of the Pyramid):
   - Integration tests validate the interactions and integration between various components or modules of the software.
   - These tests check how different units work together and whether they communicate correctly.
   - Integration tests are broader in scope than unit tests but more focused than end-to-end tests.
   - They help uncover issues related to data flow, communication, and system integration.

3. End-to-End Tests (Top of the Pyramid):
   - End-to-end tests, also known as UI tests or acceptance tests, validate the functionality of the entire application from the user's perspective.
   - These tests simulate real user interactions with the application, including user interface interactions and workflows.
   - End-to-end tests are the slowest and most brittle of the three layers, making them the most expensive to maintain and execute.
   - They are essential for ensuring that the entire application functions correctly and that all components work together seamlessly.

The key principles of the Test Pyramid strategy are as follows:
- Prioritize writing a large number of fast and reliable unit tests to cover the majority of your codebase.
- Use integration tests to validate that components and modules interact correctly.
- Limit the number of end-to-end tests to focus on critical user scenarios and workflows.

The Test Pyramid strategy helps strike a balance between test coverage, execution speed, and maintenance efforts. By emphasizing unit tests at the base of the pyramid, teams can catch and fix defects early in the development process, resulting in more robust and maintainable software. Integration and end-to-end tests serve as safety nets to ensure that the application functions correctly as a whole, without sacrificing the efficiency of the testing process.

![Pyramid](/static/Pyramid.png)



### TestCase Example

[TestCase Example](/static/TestCaseTemplate.xls)

### Test Case Identifier
  - A unique identifier or name for the test case, often using a numbering or naming convention for easy reference.

### Test Case Title
  - A brief and descriptive title that summarizes the purpose of the test case.

### Objective
  - A clear statement of the specific objective or goal of the test case.

### Prerequisites
  - Any preconditions or setup requirements that must be met before the test case can be executed.

### Test Data
  - Details about the data, inputs, or conditions to be used in the test case.

### Test Steps
  - A step-by-step list of actions to be performed during the test, including specific instructions, input data, and expected outcomes for each step.
  
### Expected Results
  - The expected outcomes or behavior at the end of each test step. This helps in determining whether the test case passed or failed.

### Test Environment
  - Information about the test environment, including hardware, software, configurations, and tools required to execute the test case.

### Test Execution
  - Guidance on how the test case should be executed, including the order of test steps and any specific conditions for execution.

### Test Pass/Fail Criteria
  - Clear criteria that define when the test case is considered a pass or a fail, based on the actual results compared to the expected results.

### Test Data Setup/Cleanup
  - Details on how test data should be prepared before the test and how any cleanup activities should be performed after the test.

### Test Dependencies
  - Any dependencies on other test cases, test scenarios, or external systems that the test case relies on.

### Defect References
  - Links or references to any related defects or issues in the defect tracking system, if applicable.

### Test Case Author
  - The name or identification of the person responsible for creating and maintaining the test case.

### Test Case Reviewer
  - The name of the person who reviewed and verified the accuracy of the test case.

### Test Case Status
  - The current status of the test case, which can indicate whether it is in draft, approved, executed, or completed.

### Test Case Priority
  - The priority of the test case, which can help in test execution scheduling.

### Attachments
  - Any additional documentation, screenshots, diagrams, or files that are relevant to the test case.

A well-structured test case document provides a clear and detailed description of how a particular functionality or aspect of the software should be tested. It helps testers understand what to test, how to test it, and what to expect as results, ensuring consistent and thorough testing throughout the project.



### TestPlan Example

[TestPlan Example](/static/TestPlan.doc)


### Introduction
   - Overview of the document.
   - Purpose and scope of the test plan.
   - Identification of the project or system being tested.

### Test Objectives
   - Clear and concise statement of what the testing aims to achieve.
   - Specific goals and desired outcomes.

### Test Strategy
   - Description of the overall approach to testing, including the testing methods and techniques that will be used.
   - Information on testing levels (e.g., unit testing, integration testing, system testing) and the order in which they will be conducted.

### Test Scope
   - Detailed information on what aspects of the system will be tested and what will not be tested.
   - Inclusion and exclusion criteria for the scope of testing.

### Test Deliverables
   - List of documents and artifacts that will be produced during the testing process, such as test cases, test scripts, test data, and test reports.

### Test Schedule
   - Timelines and milestones for the testing activities.
   - Sequence and dependencies of testing phases.

### Resource Requirements
   - Identification of the people, tools, hardware, and software needed for testing.
   - Allocation of roles and responsibilities for the testing team.

### Risks and Assumptions
   - Identification of potential risks and challenges that could impact the testing process.
   - Assumptions made during the test planning.

### Test Environment
   - Description of the test environment, including hardware, software, network configurations, and any other specific setups required for testing.

### Test Data
   - Details on the test data needed for the test cases.
   - How the test data will be created, obtained, or generated.

### Test Execution
   - Procedures for executing test cases, including the order and frequency of test runs.
   - Entry and exit criteria for each test phase.

### Test Reporting
   - Explanation of how test results will be recorded, tracked, and reported.
   - Templates for test summary reports or defect reports.

### Defect Management
   - Procedures for logging, tracking, and managing defects.
   - Severity and priority definitions for defects.

### Change Control
   - How changes to the test plan or the scope of testing will be managed and documented.

### Approval and Sign-Off
   - Identification of stakeholders who need to review and approve the test plan.
   - Sign-off process to ensure that all parties are in agreement.

### Appendices
   - Any supplementary information, such as glossaries, references, or additional details.

A well-structured and thorough test plan provides a clear roadmap for the testing process, ensuring that all stakeholders understand the objectives, scope, and logistics of the testing effort. It helps maintain consistency and quality in testing activities and serves as a reference throughout the testing project.



### Levels of Testing

Unit Testing, Integration Testing, System Testing, and Acceptance Testing are different levels of software testing that serve distinct purposes in the software development and quality assurance process. Here are similar notes on each type of testing:

### Unit Testing
- **Purpose:** Focuses on testing individual components or functions of the software in isolation.
- **Scope:** Tests the smallest units of code, such as functions, methods, or classes.
- **Isolation:** Tests are independent and isolated from the rest of the system.
- **Test Data:** Typically uses mock objects or stubs to simulate dependencies.
- **Speed:** Fast execution, suitable for continuous integration.
- **Developers are primarily responsible for writing unit tests.**
- Aims to catch and fix bugs early in the development process.

### Integration Testing
- **Purpose:** Validates the interactions and interfaces between different software components or modules.
- **Scope:** Tests the connections and integration points between units.
- **May involve testing API endpoints, data exchanges, or communication between modules.
- **Focuses on ensuring that integrated components work together correctly.**
- Helps detect issues related to data flow, interface compatibility, and component communication.
- Performed by developers and testing teams.

### System Testing
- **Purpose:** Evaluates the entire software system as a whole, including all integrated components.
- **Scope:** Tests the software in its complete and functional state.
- **Ensures that the system meets its specified requirements and functions correctly.
- **Covers functional and non-functional testing aspects, such as performance, security, and usability.**
- Typically conducted by dedicated testing teams.
- Helps identify system-level issues, such as incorrect behavior or performance bottlenecks.

### Acceptance Testing
- **Purpose:** Validates that the software meets the specified business requirements and user expectations.
- **Scope:** Focuses on user scenarios, workflows, and user acceptance criteria.
- **Typically involves end-to-end testing and often includes user interface (UI) testing.**
- Performed by stakeholders, including product owners, business analysts, or end-users.
- Ensures that the software is ready for production release and fulfills its intended purpose.
- Helps to gain confidence in the software's readiness for deployment.

In summary, these testing levels gradually progress from testing individual code units to validating the entire software system against specified requirements. Each level serves a unique purpose in ensuring the quality and reliability of the software. Unit testing focuses on small code units, integration testing ensures component interactions, system testing assesses the complete system, and acceptance testing verifies that the software aligns with user expectations and business needs.


### Traceability Matrix Example
[Traceability Matrix Example](/static/RTM_Template.xlsx)

A Requirement Traceability Matrix (RTM) is a critical document used in software development and testing to ensure that all requirements are covered and that testing efforts are aligned with those requirements. Here are notes about the Requirement Traceability Matrix:

### Requirement Traceability Matrix (RTM)
- **Purpose:** An RTM is a tool used to track and manage the relationship between requirements, test cases, and other project artifacts. It ensures that each requirement is associated with corresponding test cases, helping to maintain transparency and coverage in the testing process.
- **Scope:** RTM focuses on the mapping of requirements to various test levels and types, including unit testing, integration testing, system testing, and user acceptance testing.
- **Elements:** An RTM typically contains rows representing requirements and columns representing test cases. The cells of the matrix indicate the mapping or coverage of specific requirements by the corresponding test cases.
- **Usage:** RTMs are used to verify that all requirements are tested and to trace test cases back to their corresponding requirements. They also assist in identifying gaps, redundancies, or inconsistencies in requirements and testing efforts.
- **Key Documents:** In addition to requirements and test cases, RTMs may include other documents such as change requests, defects, and design documents to track relationships.

### Key Aspects
- **Bidi­rectional Tracing:** RTMs enable both forward tracing (from requirements to test cases) and backward tracing (from test cases to requirements).
- **Coverage Analysis:** RTMs help in assessing the extent of requirement coverage by test cases, highlighting untested or partially tested requirements.
- **Change Impact Analysis:** When requirements change, RTMs aid in identifying the impact on test cases, facilitating efficient updates to test scripts.
- **Verification:** RTMs help ensure that the project complies with defined requirements and standards.

### Benefits
- Improved Requirement Management: RTMs enhance requirement visibility and help in managing changes and updates.
- Enhanced Testing Efficiency: Testers can easily verify that all requirements are tested without omissions.
- Change Management: When requirements change, RTMs facilitate tracking and managing changes and their effects on testing.
- Gap Identification: RTMs can expose gaps or inconsistencies in requirements or test coverage.

### Challenges
- Maintaining Consistency: Keeping the RTM up-to-date with changing requirements or test cases can be challenging.
- Time-Consuming: Creating and maintaining a detailed RTM can be time-intensive, especially for large projects.

In summary, an RTM is a valuable document that ensures requirements are adequately covered by test cases, enhancing the quality and effectiveness of testing efforts. It serves as a bridge between requirements and testing, making it easier to manage changes, verify compliance, and maintain consistency throughout the software development and testing process.

### Priority vs Severity

### Bug
- **Priority (Bug):** Priority for a bug determines the order in which the bug should be fixed, based on its importance and impact. For example, "High" priority bugs need to be addressed immediately, "Medium" priority bugs can be addressed after high-priority ones, and "Low" priority bugs can be deferred.
- **Severity (Bug):** Severity characterizes the seriousness of the bug, taking into account its potential impact on the system or users. For instance, "Critical" severity bugs are show-stoppers that render the system unusable, "Major" severity bugs significantly affect functionality, and "Minor" severity bugs have minimal impact.

### Test Case
- **Priority (Test Case):** Priority for a test case determines the order in which the test case should be executed during testing. "High" priority test cases are executed early to verify critical functionalities, "Medium" priority test cases are important but not critical, and "Low" priority test cases are executed later for less critical features.
- **Severity (Test Case):** Severity for a test case characterizes the criticality of the scenario it covers. "Critical" severity test cases are essential for the system to function properly, "Major" severity test cases are important but not show-stoppers, and "Minor" severity test cases cover non-critical or cosmetic aspects.

### User Story (Agile Development):
- **Priority (User Story):** Priority for a user story in an Agile context determines its importance and order in the product backlog. It guides the development team on which stories to work on next. For example, "High" priority user stories are essential for the next sprint, "Medium" priority stories are important but not urgent, and "Low" priority stories can be addressed later.
- **Severity (User Story):** In the context of user stories, severity might not be a commonly used term. Instead, user stories often focus on the value they bring to the user or the business, which can be labeled as "High Value," "Medium Value," or "Low Value."

In Agile development, user stories are typically prioritized based on business value, customer needs, and other factors, and the concept of severity is not as relevant as in the context of testing. However, user stories can still be assigned a priority to determine their order of implementation in an Agile backlog.

### Security Testing 

### Browser Cookies

Cookies are the small encripted text files in the browser directory.

### Cookies vs Session Cookies
1. Session cookies tracks the information about the logged in session, hence the appliaction dont have to authenticate over and over again.
2. Cookies stores customers web applications settings and preferences for further use.

### Cookies Security
1. Secure Atrribute should be enabled to make sure the authentication cookies are not passed to HTTP connection calls.
2. HTTP Only flag makes sure that the cookies are retried only when HTTP call is made, if there is any cross site scripting code 
trying to access the cookie (like document.getCookies) then those calls will not contain the Cookies linked to them.
3. Make sure that the accessed domian name in commplete so that attacker cant acess subdomains, example .accenture.com can access all the subdomans like employee.accenture.com, info.accenture.com 
hence the naming for full domain will make sure that the only that domain cookies are accessed and not anything else.
4. Also make sure that the path attribute is also restricted as domain/ is less secure that domain/path/path , in second case cookies are only accessed via the path specified.
5. Confidential cookies should be expired frequently. And others expiry time should be set as per the requirements.(online banking cookies expiry should be set to session)

### SQL Basics


# DBMS (Database Management system) 

### MY SQL Docker server
```bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

### SQL login 
```bash
mysql -u<username> -hlocalhost/ServerIp -p
mysql -u<username> -hlocalhost/ServerIp -pPassword 
```

### Import/Export Table
```bash
# This exports data from a table to a .sql file
mysqldump -uroot -hlocalhost/serverIP -pPassword tableName > ~/export.sql

# This Imports data from .sql file to a table
# Note that the table name you specifi should have been already created in the SQL databse
mysql -uroot -hlocalhost/serverIP -pPassword tableName < ~/export.sql
```
### Create Db and Tables
```bash
# Create Database
create databse DatabaseName;

# Create Tables with primarykey, foreign key and constraints
create table tableName (
PrimaryKeyID int primary key auto_increment  not null,
column1 varcar(20), 
column2 text unique, 
column3 int default 0,
);
foreign key (column3) references ReferenceTableName (columnName to reference) ON DELETE CASCADE
```

### List Database and Tables
```bash
# List Database
show database;

# List Tables
show Tables;

# List Tables with views
show full Tables;

# Select Database
use Database;

# List Tables
describe tableName;
disc tableName;
```

### Delete Database and Tables 
```bash
# Delete Entire Database
drop database databaseName

# This removed the entire table from the database
drop table tablename 

# This deletes a spechific row from a table with id =3
delete from tableName where id = 3;
```


### SQL Data Manupulation

### Add data into table
```bash
insert into tablename (columnName1,columnName2) values("Test Value","Test Value2")
```

### Accessing Database
```bash
# Show all values from the table
select * from tableName;

# Show a specific row
select * from tableName where id =1;

# Show count of rows
select count(*) from tableName;

# showing non NUll values
select * from tableName where name is NOT NULL

# Show data where age not equal to 40;
select * from tableName where age != 40;

# Show unique rows
select distinct * from tableName 

# In operator
select * from tableName where  id in(1,2,3);

# Between operator
select * from tableName where id between 1 and 10;

# Get todays date year time day and week
select time(now()), day(now()), year(now()), week(now());
```

### Reguler expression usage
```bash
# Show rows with name starting with s + any letter + u
select * from tableName where (name like "%s_u" && age > 40) || (name like "%su" && age < 40) ;

# Show rows with name containing letter  o
select * from tableName where name like "%o%";

# Show rows with name not starting with su
select * from tableName where name not like "su%";
```

### Updating Database
```bash
# Adding new column to an existing table 
alter table tableName add columnName varchar(20); 

# Removing a column from an existing table
alter table tableName drop columnName

# Added Foreign key to existing table (this act like Enums in db world)
alter table tableName add constrain fk_addForeignkey foreign key (columnName) reference tablename (columnName)

# Update values in existing table
update tableName set columnName1 = "Value" where id = 1;

# Add index to and existing table(this adds index to the columns rows which helps in fetching the data quickly)
alter table tableName add index idx_index(columnName);
```

### Group By, Order by, Limits, Union, UnionAll, Sub Queries, Views, Intersect, Exists, Case
```bash
# Accending Order
select * from tableName order by columnName1 asc, columnName2 desc;

# Decending Order
select * from tableName order by columnName1 desc, columnName2 desc;

# Group By
select columnName2 from tableName where condition group by columnName2 having condition order by columnName2 asc/desc;

#Limits
select * from TableName Limit 1, 10;

# note - Both the tables needs to be similer for this to work
# Union Rmoves duplicates while unionall doesnt 
select * from TableName condition
union/union all
select * from TableName condition

# Intersect
# Returns values which are in both the tables 
# both the columns should be same in both the tables
# Functionality only available in Oracle DB
select * from TableName condition
intersect
select * from TableName condition
# in mysql find solutions for intersect is as per below
select * from table1 where id in (select id from table2);

# Exists
# this runs the second query first and if that is true only then the first query is run 
select * from table1 exists(select * from table1 where id =1);

# case
select columns, case id 
when 1 then columns * 2 
when 2 then columns * 4 
else columns
end
'new_column_name', column3
from table


# Sub Queries
select * from TableName where column in (select * from table);

# View
create view viewName as (your SQL query);
# View is a virtual table whose access can be provided to restricted users(developer decides which columns to be visible in the views)
# View creates something which looks like table but in the background it just runs the query and creates a table/view.
# Hene views can be slow to access.
# note - data can be inserted into the view but it will endup inserting in the main table (might not be visible in view)
```

### Joins 
```bash
# Inner Join 
select a.columnName1 , b.columnName2 from table1 as a join table2 as b on a.columnName1 = b.columnName2;

# Left Join 
select a.columnName1 , b.columnName2 from table1 as a left join table2 as b on a.columnName1 = b.columnName2;

# Right Join 
select a.columnName1 , b.columnName2 from table1 as a right join table2 as b on a.columnName1 = b.columnName2;
```

### Variables and Functions 
```bash
# Varibale
set @varName = "Value";

# Function

# Join Strings
select concat(columnName,string2,string3,and so on ...) from tableName;

# Uppercase String
select ucase(string);

# Lower case String
select lcase(string)
```

### Stored Proc
```bash 
# running multiple qureies at ones from another application
# Create Procedure
create procedure ProcedureName(in id1 int, id2 int, title text )
begin
select id, title into @id, @title from tableName where columnName1 < id1 and columnName2 > id2 and columnName3 = title;
end;
# note - you should be using a databse for prcedures to work

# Drop Procedure
drop prcedure ProcedureName;

# invoking a procedure
call ProcedureName(1,2);

# Create Function 
# just returns one single value
create function functionName(id int, name text) returns numberic(10,2) 
begin
  declare results numberic(10,2);
  select id into @results from tablename where id= 1;

  return results
end; 

# calling Function 
select functionName(1,2,"text"); 
# functions will return one value 

```


### SQL DataTypes

### Numeric Types
```bash
INT or INTEGER: A whole number.

TINYINT: A very small integer.

SMALLINT: A small integer.

MEDIUMINT: A medium-sized integer.

BIGINT: A large integer.

FLOAT: A single-precision floating-point number.

DOUBLE or REAL: A double-precision floating-point number.

DECIMAL or NUMERIC: A fixed-point decimal number.
```

### Date and Time Types
```bash
DATE: Date in 'YYYY-MM-DD' format.

TIME: Time in 'HH:MM:SS' format.

DATETIME: Date and time in 'YYYY-MM-DD HH:MM:SS' format.

TIMESTAMP: A timestamp representing a datetime value.

YEAR: A year in 2-digit or 4-digit format.
```

### String Types
 ```bash
CHAR: Fixed-length character string.

VARCHAR: Variable-length character string.

BINARY: Fixed-length binary string.

VARBINARY: Variable-length binary string.

TINYBLOB, TINYTEXT: Tiny binary or text data.

BLOB, TEXT: Binary or text data of various sizes.

MEDIUMBLOB, MEDIUMTEXT: Medium-sized binary or text data.

LONGBLOB, LONGTEXT: Large binary or text data.

ENUM: Enumeration of possible values.

SET: Set of values, where each value can be selected.
```

### JSON Types
```bash
JSON: JSON data type for storing JSON-encoded data.
```

### Spatial Types
```bash
GEOMETRY: For geometric shapes.

POINT: For a point in space.

LINESTRING: For a series of points.

POLYGON: For a closed shape.
```

### Other types
```bash
BIT: A bit field type.

BOOLEAN or BOOL: A synonym for TINYINT(1).

SERIAL: An alias for BIGINT UNSIGNED AUTO_INCREMENT.
```

### Custom User-Defined Types
```bash
MySQL allows you to create your own custom data types using the CREATE TYPE statement.
```

### Temporal Types (Introduced in MySQL 8.0)
```bash
YEAR,
YEAR_MONTH,
YEAR_DAY,
MONTH_DAY,
DAY_TIME,
HOUR_MINUTE,
MINUTE_SECOND,
SECOND_MICROSECOND,
TIME_ZONE,
and more. These types are used for working with temporal values.
```


### SQL Injection

SQL injection is a type of cyberattack that occurs when an attacker inserts malicious SQL (Structured Query Language) code into a vulnerable SQL query. SQL is a language used for managing and manipulating relational databases, and SQL injection attacks take advantage of poorly sanitized or unprotected inputs in web applications or software that interact with databases.

Here's how SQL injection works:

1. **Vulnerable Input**: In a web application, user inputs such as text fields, search boxes, or URL parameters are often used in SQL queries without proper validation or sanitization.

2. **Malicious Input**: An attacker submits carefully crafted input that includes SQL code in these vulnerable input fields. For example, they might input something like `' OR 1=1; --`.

3. **Manipulating Queries**: The attacker's input is then concatenated with the original SQL query executed by the application. If the application doesn't properly validate or sanitize the input, the resulting query becomes a combination of the original query and the malicious SQL code.

4. **Execution**: The modified query is sent to the database server, which executes it as if it were a legitimate query. In the example above, `' OR 1=1; --`, the attacker's goal is typically to make the query always return true (1=1), allowing them to bypass authentication or access unauthorized data.

5. **Data Theft or Manipulation**: Depending on the attacker's intentions, they can use SQL injection to steal, manipulate, or delete data from the database, gain unauthorized access, or even take control of the entire application.

SQL injection attacks are a significant security concern and can have severe consequences if not properly mitigated. To prevent SQL injection, developers should use techniques such as parameterized queries or prepared statements, input validation, and output encoding to ensure that user inputs are not treated as executable SQL code. Additionally, regular security testing and code reviews can help identify and address potential vulnerabilities.

1. Check from the list if website can be exploited using SQL injection.
2. try enterting the orderby's with column 8 randomy to know the size of table.
3. try entering incorrect query to understand which sql tool is being used.
4. getting all the userid's
```bash
select * from user where username = tom or 1+1;
https://?tom or 1+1;
```


### SQL Operators


### Comparision
```bash
> 	Greater than operator

>= 	Greater than or equal operator

< 	Less than operator

<>, != 	Not equal operator

<= 	Less than or equal operator

<=> 	NULL-safe equal to operator

= 	Equal operator

BETWEEN ... AND ... 	Whether a value is within a range of values

COALESCE() 	Return the first non-NULL argument

GREATEST() 	Return the largest argument

IN() 	Whether a value is within a set of values

INTERVAL() 	Return the index of the argument that is less than the first argument

IS 	Test a value against a boolean

IS NOT 	Test a value against a boolean

IS NOT NULL 	NOT NULL value test

IS NULL 	NULL value test

ISNULL() 	Test whether the argument is NULL

LEAST() 	Return the smallest argument

LIKE 	Simple pattern matching

NOT BETWEEN ... AND ... 	Whether a value is not within a range of values

NOT IN() 	Whether a value is not within a set of values

NOT LIKE 	Negation of simple pattern matching

STRCMP() 	Compare two strings 
```

### Logical
```bash

AND, && 	Logical AND

NOT, ! 	Negates value

OR, || 	Logical OR

XOR 	Logical XOR 
```


### XSS Attack

Xross site scripting also know as XSS , as one of the most common we application vulneribility that 
allows attackers to run his own client side script(specially javascript) in the web page viewed by the user.

### Vulnerable cases
- Url post string 
- Input Elements eg - sending html tags in the input elements.
- From submission
- Any html tags passed in the input should convert to encoded format for the website to be secure.

### Reflective XSS
1. This is when the passed input is only valied for the active browser session.
2. Also when malessios code is entered in the input, Website should not give any indication on what are allowed 
characters and patterns hence the attacker is not fully aware of the exploits.

### Persistence XSS
1. In Persistence XSS attack the injected script gets altered or injected on the server.
2. Hence anyone can then exploit the application from any device after this attack.
3. Who ever visits the website the mellisous script will get downloaded to the clients machine.

### Session Hijacking and CSRF(Cross site request forgrery)
1. malicious links can be used to access saved auth cookies to access sensitive applications from your own system , so never click on a suspicious linkes.

### Cryptography tokens
1. On login two tokens gets generated
2. Lets say for submitting a form attacker might be able to replicate with endpoints with params but if the form submission is using cryptographi token which was generate at the time of login will be needed to move forward.
hence the attacker will not be able to attack the website.
3. Confidential data should not go as a part of get request, it should alwasys go in post request.
4. Request should not be successfull on manually changing the token value.
5. Try hitting the token ID from another system and with other user, this should not work.
6. Check if the both the Cryptography token are required not just one.
7. Make sure Cryptography tokens are used for sensitive data on the website.

### Bruteforce attach handler mechanisim
1. make sure that automation scripts to do not try cmbinations and understand the password, lock account after 3 or 5 attempts.


### References

https://www.1keydata.com/sql/sql.html

## Xray 

### Xray Types
![XrayTypes.png](/static/XrayTypes.png)

### Xray Functionality
![XRAYFunctionality.png](/static/XRAYFunctionality.png)

### Issue Types
![IssueTypes.png](/static/IssueTypes.png)

### Issue Types added
![IssueTypes.png](/static/IssueTypes1.png)

### Supported Frameworks
![FrameworksSupported.png](/static/FrameworksSupported.png)

### CI Support 
![CISupport.png](/static/CISupport.png)

### Testing Board
![TestingBoard.png](/static/TestingBoard.png)

![TestBoard1.png](/static/TestBoard1.png)

### TestCase
![TestCase.png](/static/TestCase.png)

### Sprint Board
![SprintBoard.png](/static/SprintBoard.png)

### Reference  
```
https://docs.getxray.app/site/xray
```

### Terminology

|Xray|ISTQB|Description|   |
|---|---|---|---|
|**Test**|Test|A test case. It may either be manual or automated, composed of multiple steps, actions and expected results.|test case, test scenario, test template|
|**Precondition**|Pre-Condition|Initial conditions that must be assured before the execution of the Test's own steps. A Pre-Condition may be used by multiple Tests.||
|**Test Set**|Test Set|A group of tests, organized in some logical way. A test may belong to multiple Test Sets.|test group, test suite|
|**Test Plan**|Test Plan|A "formal" plan of the tests intended to be executed for a given version.||
|**Test Execution**|Test Execution|An assignable, "schedulable" task to execute one or more tests for a given version/revision along with its results.|test cycle|
|**Sub-Test Execution**|Sub-Test Execution|A Sub-Test Execution has the same functionalities as the [Test Execution](http://confluence.xpand-addons.com/display/XRAY/Test+Execution) issue type. The difference between them is that the Sub-Test Execution is a sub-task and can be created in a requirement's context. Creating a Test Execution as a sub-task from within the requirement issue screen will provide the user the ability to track executions on the Agile board.||
|**Test Run**|-|A specific run of a test. An instance of the test containing the execution status and a snapshot of the test specification. Whenever a user adds a Test to a Test Execution, a test run is created internally within the Test Execution context. A test may have multiple test runs.||
|**Coverable Issue**|Story, requirement, Bug, ....|All issues whose Issue Type is configured as being a Coverable Issue Type in [Project Settings: Test Coverage](https://docs.getxray.app/display/XRAYCLOUD/Project+Settings%3A+Test+Coverage).||
|**Test Status**|-|The calculated test coverage status of a Test, for some scope (e.g., version/test plan). In the context of a Test Execution, the recorded status of a Test Run.|..|
|**Requirement**|Story, Requirement, ....|Something that you expect from the system; a feature. A good requirement explains how the system should behave and its purpose.||
|**Test Repository**|-|The full list of tests within a project. In Xray, the test repository is simply composed of all Test issues.||
|**Test Strategy**|-|The requirements you want to validate, how to validate them, use of either manual or automated tests, the resource allocation, etc.||
|**Testing Lifecycle**|-|After requirement specification and revision, the testing lifecyce involves test **planning**, test **designing**, test **execution** and test **reporting.**||

### TestCase 
![XrayTypes.png](/static/TestCase1.png)

![XrayTypes.png](/static/TestCase2.png)

![XrayTypes.png](/static/TestCase3.png)

![XrayTypes.png](/static/TestCase.png)

### Test Types
- **Cucumber**: of the Gherkin Kind;
- **Generic**: of the Unstructured Kind;
- **Manual**: of the Steps Kind.

### Preconditions 
- A Precondition is like defining the step "0" for your tests.

### Precondition Types
    - Manual Type
    - Generic Type
    - Cucumber Type

### Cucumber 
![Precondition1.png](/static/Precondition1.png)

### Manual and Generic
![Precondition2.png](/static/Precondition2.png)

### Import Steps

- Test
- CSV
- JSON
- Clipboard

### Export Steps

- To CSV
### Cucumber Tests
![CucumberPrecondition.png](/static/CucumberPrecondition.png)

### Export to Cucumber 

1. Feature file can be exported from xray itself. 

![CucumberPrecondition1.png](/static/CucumberPrecondition1.png)
**Export to Cucumber**

### Parameterized Test
![ManualParams.png](/static/ManualParams.png)

### Datasets

The parameters, along with their values, are defined within a **dataset**. A dataset is a collection of data represented with a tabular view where every column of the table represents a particular variable (or **parameter**), and each row corresponds to a given record (or **iteration**) of the dataset.

The number of rows in the dataset determines the number of iterations to execute. If the dataset contains a single row, there will be a single execution parameterized with the values defined on the dataset row.

Datasets can be defined in different [entities and scopes](https://docs.getxray.app/display/XRAYCLOUD/Parameterized+Tests#ParameterizedTests-Datasetscopes). A dataset can be defined, edited, or simply viewed using the "**Dataset**" button located in each Xray [entity or scope](https://docs.getxray.app/display/XRAYCLOUD/Parameterized+Tests#ParameterizedTests-Datasetscopes).
  
![DataDriven.png](/static/DataDriven.png)

### Test Case Versioning 
![TestCaseVersion.png](/static/TestCaseVersion.png)

### Test Coverage add Coverage
![Story.png](/static/TestCoverageStory.png)

### Test Coverage add Defect
![Story.png](/static/TestCoverageDefect.png)

### Test Coverage Story
![Story.png](/static/TestCoverage.png)


### Execute Tests
 
The easiest way to execute your tests is directly from the Test Plan, but you can also perform ad-hoc Test Executions directly from a Test, or even create a new Test Execution issue. 

1. Inside the **Test Plan**, click on **Create Test Execution**.  

![Excecution.png](/static/Excecution.png)

2. Go to **Test Execution**, and click on **Execute** (play button).  

![Excecution1.png](/static/Excecution1.png)

3. You are now at the Test Execution Screen, and from here you can follow the test steps and set the execution status: **TODO**, **EXECUTING**, **FAIL** and **PASS.  

![Excecution2.png](/static/Excecution2.png)

4. Did you find a defect and want to report it? Create Defects from the Test Execution Screen, click on + button in the **Findings** section and select **Create Defect** (or expand the **Findings** section and in the **Defects** panel select **Create Defect)  

![AddDefect.png](/static/AddDefect.png)
        
### Sub Test Execution

A Sub-Test Execution is similar to a Test Execution, but created as a sub-task of a requirement.
Normally, you will create Test Executions from Test Plans, or create ad hoc Test Executions (directly from a Test).

### Test Repository  

A project page which enables the hierarchical organisation of Tests at the project level by allowing you to organise Tests in folders and sub-folders. You can also perform several actions from this page including, creating new Tests, creating new Test Plans, Test Sets, Test Executions for a group of Tests, etc. This is the recommended approach whenever you have a large number of Tests and want to manage them more effectively.

### Test Set

An issue type for organising tests, and it is a flat list of Tests and is a simple way to create different groups of Tests. You can easily use them to add several Tests at once into Tests Plans or Test Executions.

###  Test Plan

1. With Test Plans you will decide which Tests you want to perform, who will execute them and when they will be executed.  
2. Also, you may want to prioritise some of the Tests and focus on specific requirements.  
3. Test Plans are used to define the scope of your testing, track and consolidate the related results, no matter how many times you've run the tests.

### Planning 
Planning is the activity where you decide your **testing strategy,** e.g.,  which covered issues you want to validate, how would you validate them, will it be manual or automated, how will the resources be allocated, when and who will execute the tests. Depending on several factors, you may want to prioritize some of the tests, or focus on specific requirements. 

Although you may plan tests in [different ways](https://docs.getxray.app/display/XRAYCLOUD/Test+Process), we recommend that you use the [Test Plan](https://docs.getxray.app/display/XRAYCLOUD/Test+Plan) issue specifically for this purpose.

In your Test Plan, you can put the Tests you want to track for a given version and the Test Plan will show you the consolidated results for those Tests. In other words, it will present the latest status of each Test, independent of the number of testing iterations (i.e., Test Execution) you make with them

### Test Plan Steps

1. Click **Create** button and select **Test Plan** issue.
2. Besides **Summary**, you may want to fill out the **Fix Version** to indicate that you're tracking the results of the Tests for a specific version. This only makes sense if you have multiple versions.  

![CreateTestPlan.png](/static/CreateTestPlan.png)

3. After creating the **Test Plan**, you can add **Tests**.  

![AddTests.png](/static/AddTests.png)    

5. Choose the Tests you want, by using the **Select** or **Search** tabs and then selecting some or all of them. Click **Add Selected** or **Add All**.  

![TestPlan.png](/static/TestPlan.png)

###  Reports

Xray provides several ways to make it easier for the entire team to have a clear view of the overall readiness of the project.

As part of your daily tasks, use the dedicated reports and gadgets available in your customized dashboard to evaluate your testing progress.

The most popular reports are: 

![Reports.png](/static/Reports.png)

## Zephyr 

### Test Case 
A test artefact developed for a particular test condition, such as to exercise a particular program path or to verify compliance with a specific requirement.

### Test Library 
The location where test cases are created and stored. This is also known as a test repository. Any Jira project can be a test library. Test cases are created and managed under a test library; however, you can share and reuse test cases across Jira projects when necessary to prevent duplication and increase reusability. Within a test Library, you can organize test cases by using a folder structure and categorize by using labels or custom fields.

### Test Script 
A specified sequence of steps and expected results for the execution of a test case. This is also known as manual test script or test procedure specification. Zephyr Scale allows the use of traditional step-by-step as well as BDD (Gherkin syntax) and plain text scripts.

### Test Cycle 
An ordered list of test cases assigned to testers and test environments created to achieve specific testing goals (usually a longer test run, such as regression tests, build verification tests, end-to-end tests, etc.).

### Test Plan 
An artefact used to track testing progress throughout an entire release or version. You can associate several test cycles to a test plan to can get real-time progress reports. Test plan fields are customizable, which allows you to track scope, risks, strategy, entry and exit criteria, test environment, test bed, and more.

### Test Execution Result 
A set of information that generates and is stored when a test case is executed. Data includes the tester responsible for the execution, the execution date, the defects raised, the environment and the status of the execution (e.g., passed or failed), and more.

### Test Environment 
A test environment is an attribute of a test execution result used to determine the environments to be tested for each test case. Planning your test environment includes defining your platform coverage, such as operational systems, browsers, databases, etc.

![ZephyrScale.png](/static/ZephyrScale.png)

### Settings
![ZSettings.png](/static/ZSettings.png)
### Navigation
 https://support.smartbear.com/zephyr-scale-cloud/docs/get-started/navigation-basics.html

### Working With Folders
https://support.smartbear.com/zephy-scale-cloud/docs/get-started/working-with-folders.html

### Workflow Strategies
![Workflow.png](/static/Workflow.png)

### TestPlan

Test plans (groups of test cycles) are used to track testing progress throughout an entire release or version. You can link several test cycles to a test plan and get real-time progress reports when you need them. Test plan fields are customizable, which allows you to track scope, risk, strategy, entry and exit criteria, test environment, test bed, and more.

### TestCycle


The test case stores useful information, like the tester responsible for the execution, the execution date, the defects raised, the environment used, and the status of the execution (e.g., passed, failed, etc).

![tc1.png](/static/tc1.png)

![tc3.png](/static/tc3.png)

### Executing Tests from Cycle

![tc2.png](/static/tc2.png)


### Jira Zephyr Integration
![tcz.png](/static/tcz.png)

### Link to Defect 
![tcz1.png](/static/tcz1.png)

### TestCase
![TestCase](/static/TestCase.png)


### Test Data
![Zephyr5.png](/static/Zephyr5.png)

### Parameters
![zep2.png](/static/zep2.png)

### Modular Test Case
![zep3.png](/static/zep3.png)

### Test Case Versions
![ze4.png](/static/ze4.png)

### BDD Tests
![zep5.png](/static/zep5.png)
Select Export Feature Files (BDD - Gherkin) from **More** to download the feature file for your new test case (or the selected test cases).

### Data Driven Test
Testdata:
![zep6.png](/static/zep6.png)

DataSet:
![zep7.png](/static/zep7.png)

### Test Cycle 

A test cycle is a set of test cases that are grouped to achieve specific testing goals. Test cycles can be assigned to specific testers and test environments, and they offer a comprehensive overview of coordinated testing efforts.

### Creating Test Cases in Bulk
![zep8.png](/static/zep8.png)

![zep9.png](/static/zep9.png)

![zep10.png](/static/zep10.png)

### Jira Integration 
![zep11.png](/static/zep11.png)

### Test Execution
![zep13.png](/static/zep13.png)

![zep14.png](/static/zep14.png)

### Test-Execution Reports

Test-execution reports provide information about the status of the testing effort, including overall software quality and test execution progress.

|Report Title|Description|
|---|---|
|_Test execution results (summary)_|Provides the summary of the test execution results (such as the overall status and progress)|
|_Test execution results (list)_|Provides a list of test execution results|
|_Test execution results (detailed)_|Provides a list of test execution results with details|
|_Test execution burn up_|Provides a test execution burn-up chart.|
|_Test execution burn down_|Provides a test execution burn-down chart.|
|_Test execution completion over time by status_|Provides a test execution results line and bar chart.|
|_Test execution completion over time_|Provides a test execution results line and bar chart (completed).|
|_Test execution completion over time by status (accumulated)_|Provides a test execution results line and bar chart (accumulated).|
|_Test execution effort over time_|Provides a test execution effort line and bar chart|
|_Test execution effort (overall)_|Provides a test execution effort bar chart (estimated x actual).|
|_Test execution effort by tester_|Provides a test execution effort by tester (estimated x actual).|
|_Test execution results (overall)_|Provides a test execution results gauge chart (overall).|
|_Test execution results (progress)_|Provides a test execution results donut chart.|
|_Test execution results by project_|Provides a test execution results stacked bar chart grouped by project.|
|_Test execution results by coverage_|Provides a test execution results stacked bar chart grouped by coverage|
|_Test execution results by test plan_|Provides a test execution results stacked bar chart grouped by test plan|
|_Test execution results by test cycle_|Provides a test execution results stacked bar chart grouped by test cycle|
|_Test execution results by tester_|Provides a test execution results stacked bar chart grouped by tester.|
|Test execution results by component|Provides a test execution results stacked bar chart grouped by component.|
|_Test execution results by environment_|Provides a test execution results stacked bar chart grouped by environment|
|_Test execution results by label_|Provides a test execution results stacked bar chart grouped by label|
|_Test execution results by iteration_|Provides a test execution results stacked bar chart grouped by iteration.|
|_Test execution results by version_|Provides a test execution results stacked bar chart grouped by version.|
|_Test execution results by priority_|Provides a test execution results stacked bar chart grouped by priority.|
|_Test execution results by type_|Provides a test execution results stacked bar chart grouped by test execution type (manual x automated)|
|_Test execution scorecard by test cycle_|Provides a test execution results scorecard broken down by test cycle|
|_Test execution scorecard by tester_|Provides a test execution results scorecard broken down by tester|

### Traceability Reports

Traceability reports give you the ability to see coverage details from a range of helpful perspectives.

|Report Title|Description|
|---|---|
|_Coverage Report_|Displays the coverage relationship between issues (coverage) and test cases|
|_Traceability Report_|Provides a table of the traceability between issues (coverage), test cases, and test executions|
|_Traceability Matrix_|Displays the traceability matrix between test cases and issues (coverage)|
|_Traceability Tree_|Offers you dynamic, broad-ranging traceability and coverage statistics for all Jira issue types|

![tp5.png](/static/tp5.png)

## AutomationFramework

![AutomationFramework.png](/static/AutomationFramework.png)

![FeatureFile.png](/static/FeatureFile.png)

![MicroFrontend.png]](/static/MicroFrontend.png)

![[Pasted image 20240121140937.png]](/static/Pasted image 20240121140937.png)

![[Pasted image 20240121141023.png]](/static/Pasted image 20240121141023.png)

![[Pasted image 20240121141132.png]](/static/Pasted image 20240121141132.png)

![[Pasted image 20240121141249.png]](/static/Pasted image 20240121141249.png)

### Unit Testing
![[Pasted image 20240121141312.png]](/static/Pasted image 20240121141312.png)

![[Pasted image 20240121141538.png]](/static/Pasted image 20240121141538.png)

![[Pasted image 20240121141657.png]](/static/Pasted image 20240121141657.png)

![[Pasted image 20240121141925.png]](/static/Pasted image 20240121141925.png)

![[Pasted image 20240121142203.png]](/static/Pasted image 20240121142203.png)

### Integration Testing

![[Pasted image 20240121142421.png]](/static/Pasted image 20240121142421.png)

![[Pasted image 20240121142522.png]](/static/Pasted image 20240121142522.png)

![[Pasted image 20240121143943.png]](/static/Pasted image 20240121143943.png)

![[Pasted image 20240121144003.png]](/static/Pasted image 20240121144003.png)

![[Pasted image 20240121144117.png]](/static/Pasted image 20240121144117.png)

![[Pasted image 20240121144212.png]](/static/Pasted image 20240121144212.png)

![[Pasted image 20240121144255.png]](/static/Pasted image 20240121144255.png)

![[Pasted image 20240121144357.png]](/static/Pasted image 20240121144357.png)

![[Pasted image 20240121144505.png]](/static/Pasted image 20240121144505.png)

![[Pasted image 20240121144528.png]](/static/Pasted image 20240121144528.png)

![[Pasted image 20240121144825.png]](/static/Pasted image 20240121144825.png)

![[Pasted image 20240121204715.png]](/static/Pasted image 20240121204715.png)

![[Pasted image 20240121204858.png]](/static/Pasted image 20240121204858.png)

![[Pasted image 20240121205113.png]](/static/Pasted image 20240121205113.png)

![[Pasted image 20240121213022.png]](/static/Pasted image 20240121213022.png)

![[Pasted image 20240121213212.png]](/static/Pasted image 20240121213212.png)

![[Pasted image 20240121213325.png]](/static/Pasted image 20240121213325.png)

```Create MicroFrontend
npx create-mf-app
```

## Cucumber
### Basics

Cucumber is the BDD Framework for running automated tests. Cucumber does not Automate your testcases.

![Cucumber.png](/static/Cucumber.png)

### Create Cucumber Project
```shell
mvn archetype:generate                      \
   "-DarchetypeGroupId=io.cucumber"           \
   "-DarchetypeArtifactId=cucumber-archetype" \
   "-DarchetypeVersion=7.15.0"               \
   "-DgroupId=hellocucumber"                  \
   "-DartifactId=hellocucumber"               \
   "-Dpackage=hellocucumber"                  \
   "-Dversion=1.0.0-SNAPSHOT"                 \
   "-DinteractiveMode=false"
```
### Gherkin
a Business Readable, Domain Specific Language  that lets you describe software's behavior.

### Cucumber Terminology 
- Scenario
- Feature
- Feature file
- Scenario outline
- Step Definition

### Feature
```Cucumber

Background:
  Start Browser

Feature: Test Suite 
  Scenario: test case
    Given step with int 1
    When step with string "two"
    Then step three
    And step four
    Then step five
    But step six

### Step Defination
```Cucumber
	@Given("step with int {int}")
	public void step_with_int(Integer int1) {
		System.out.println("Step 1");
	}

	@When("step with string {string}")
	public void step_with_string(String string) {
		System.out.println("Step 2");
	}

	@Then("step three")
	public void step_three() {
		System.out.println("Step 3");
	}

	@Then("step four")
	public void step_four() {
		System.out.println("Step 4");
	}

	@Then("step five")
	public void step_five() {
		System.out.println("Step 5");
	}

	@Then("step six")
	public void step_six() {
		System.out.println("Step 6");
	}
```

### Runner File
```Java
import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
features = "src/test/java/features",
glue = "stepDefination",
monochrome = true,
tags = "@Smoke",
dryrun = true,
plugin = {"pretty", "html:target/cucumber.html","json:target/cucumber.json", "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:" }
)

public class smokeRunner extends AbstractTestNGCucumberTests {}
```

### Tags 

```Cucumber@
  @Smoke
  Scenario: test case
    Given step with int 1

  @Regression
  Scenario: test case
    Given step with int 1

  @Smoke @Regression
  Scenario: test case
    Given step with int 1

# Runner Params
tags = "@Smoke"
tags = "@Smoke and @Regression"
tags = "@Smoke or @Regression"
tags = "not @Smoke"
```

### Hooks

```java
public class hooks {

	@Before
	public void beforeAll() {
		System.out.println("------------------");
		System.out.println("Before all");
		System.out.println("------------------");
	}

	@After
	public void afterAll() {
		System.out.println("------------------");
		System.out.println("After all");
		System.out.println("------------------");
	}

	@Before("@Smoke")
	public void beforeAllSmoke() {
		System.out.println("------------------");
		System.out.println("Before all smoke");
		System.out.println("------------------");
	}

	@After("@Smoke")
	public void afterAllSmoke() {
		System.out.println("------------------");
		System.out.println("After all smoke");
		System.out.println("------------------");
	}

}
```

cucumber dependency injection (picocontainer)

step definition should be written using SRP (Single Responsibility Principle)

### ExtentReports Cucumber7 Adapter
```
https://ghchirp.site/3196/
```

### extent.properties
```
extent.reporter.spark.start=true
extent.reporter.spark.out=target/extentReport/report.html
```

### Spark-config.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<extentreports>
	<configuration>
		<!-- report theme -->
		<!-- standard, dark -->
		<theme>dark</theme>

		<!-- document encoding -->
		<!-- defaults to UTF-8 -->
		<encoding>UTF-8</encoding>

		<!-- protocol for script and stylesheets -->
		<!-- defaults to https -->
		<protocol>https</protocol>

		<!-- title of the document -->
		<documentTitle>Basic Test</documentTitle>

		<!-- report name - displayed at top-nav -->
		<reportName>Report Name</reportName>

		<!-- view report without internet -->
		<offlineMode>false</offlineMode>

		<thumbnailForBase64>true</thumbnailForBase64>

		<!-- custom javascript -->
		<js></js>

		<!-- custom styles -->
		<css></css>
	</configuration>
</extentreports>
```

### Take ScreenShots on failure
```java
	@AfterStep
	public void takeScreenShots(Scenario scenario) throws IOException {
		if(scenario.isFailed()) {
			//Take Screenshot
			byte[] screenshotFile = ((TakesScreenshot)contextManager.driverManager.getDriver()).getScreenshotAs(OutputType.BYTES);
			//Attach to Extent report
			scenario.attach(screenshotFile, "image/png", "image");
		}
	}
```


### Dependency Injection

1. Add Cucumber picocontainer for the POM file from mvn repository.
2. Create a BrowserContext class for injection.

```Java
public class BrowserContext {

	public WebDriver driver;

	public BrowserContext() {
		driver = new ChromeDriver();
	}

}
```

3. Call the BrowserContext in stepdefinition file

```Java
public class login {
	 WebDriver driver;
	 
	 public login(BrowserContext browserContext){
		 this.driver = browserContext.driver;
	 }
}
```

4. You don't need to create an object of of the Browser Context class to when using picocontainer for dependency injection
5. Always write step definition with SRP(Single Responsibility principal)
6. Class's needs to be loosely coupled when righting step-definition.


### Factory Desgin Pattern

1. Create a class files with getters of all the pages in page Object class.

```Java
package pagesObject;

public class PageObjectManager {
	
	public LoginPage getLoginPage() {
		return new LoginPage();
	}

}
```
2. Add getter for PageObjectManger in BrowserContext class
```Java
	public PageObjectManager getPageObjectManager() {
		return new PageObjectManager();
	}
```
3. Call the PageObjectManager from stepdefinition

```Java
	LoginPage loginPage = browserContext.getPageObjectManager().getLoginPage(); 
```
### Dependency Injection

1. Add Cucumber picocontainer for the POM file from mvn repository.
2. Create a BrowserContext class for injection.

```Java
public class BrowserContext {

	public WebDriver driver;

	public BrowserContext() {
		driver = new ChromeDriver();
	}

}
```

3. Call the BrowserContext in stepdefinition file

```Java
public class login {
	 WebDriver driver;
	 
	 public login(BrowserContext browserContext){
		 this.driver = browserContext.driver;
	 }
}
```

4. You don't need to create an object of of the Browser Context class to when using picocontainer for dependency injection
5. Always write step definition with SRP(Single Responsibility principal)
6. Class's needs to be loosely coupled when righting step-definition.


### Factory Desgin Pattern

1. Create a class files with getters of all the pages in page Object class.

```Java
package pagesObject;

public class PageObjectManager {
	
	public LoginPage getLoginPage() {
		return new LoginPage();
	}

}
```
2. Add getter for PageObjectManger in BrowserContext class
```Java
	public PageObjectManager getPageObjectManager() {
		return new PageObjectManager();
	}
```
3. Call the PageObjectManager from stepdefinition

```Java
	LoginPage loginPage = browserContext.getPageObjectManager().getLoginPage(); 
```

### Parallel Test using Surefire

- [Parallel Tests](https://cucumber.io/docs/guides/parallel-execution/?lang=java#testng)

```xml
<!-- https://mvnrepository.com/artifact/org.apache.maven.plugins/maven-surefire-plugin -->
<dependency>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.3</version>
</dependency>

```

```Java
public class Regression extends AbstractTestNGCucumberTests {

@Override

@DataProvider(parallel = true)

public Object[][] scenarios() {

return super.scenarios();

}

}
```

To add the Surefire plugin to your `pom.xml` file, you can include the following configuration:

```xml
<build>
	<plugins>
		<!-- Surefire Plugin for running tests -->
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-surefire-plugin</artifactId>
			<version>3.0.0-M5</version> <!-- Use the latest version available -->

			<configuration>
				<!-- Set the test classes directory -->
				<testClassesDirectory>${project.build.directory}</testClassesDirectory>
				<includes>
					<include>**/*Test*.java</include>
					<include>**/*Test.java</include>
					<include>**/*Tests.java</include>
				</includes>
			</configuration>
		</plugin>
	</plugins>
</build>
```

This configuration will include the Surefire Plugin with the specified version (3.0.0-M5 in this example). It also configures the plugin to include test classes based on the standard naming conventions (`*Test*.java`, `*Test.java`, `*Tests.java`).

Make sure to replace the version with the latest version available at the time you're adding it. You can check the [Maven Repository](https://mvnrepository.com/artifact/org.apache.maven.plugins/maven-surefire-plugin) for the latest version.

### Parallel Tests using FireSure
```Java
<plugin>

<groupId>org.apache.maven.plugins</groupId>

<artifactId>maven-failsafe-plugin</artifactId>

<version>2.22.0</version>

<executions>

<execution>

<goals>

<goal>integration-test</goal>

<goal>verify</goal>

</goals>

<configuration>

<parallel>methods</parallel>

<useUnlimitedThreads>true</useUnlimitedThreads>

</configuration>

</execution>

</executions>

</plugin>
```

## Grid
`Parallel Tests on Multiple Machines with Differen versions of Browser on different Platform`

#### Development Server on 4444
```
java -jar selenium-server-<version>.jar standalone
```
### Architecture
![GridOfficialArchitecture](/static/gridOfficial.png)
![Grid.png](/static/Grid.png)

![GridFacts.png](/static/GridFacts.png)


<iframe src="https://www.selenium.dev/documentation/grid/getting_started/#grid-roles" width="100%" height="7220px" scrolling="no"></iframe>

**Not applicable in case of Safari -- It can only spin up one instance**
### Hub Registration
```shell
java -jar selenium-server-<version>.jar hub
```
### Hub on a specific port 
```shell
java -jar selenium-server-<version>.jar hub --publish-events tcp://<hub-ip>:8886 --subscribe-events tcp://<hub-ip>:8887 --port 8888
```

### Node registration
```shell
java -jar selenium-server-<version>.jar node 
```
### Node registration on a specific port
```shell
java -jar selenium-server-<version>.jar node --port 5555
```
### Connect to a hub 
```shell
java -jar selenium-server-<version>.jar node --hub http://<hub-ip>:4444
```
### connect to a hub with specific port 
```shell
java -jar selenium-server-<version>.jar node --publish-events tcp://<hub-ip>:8886 --subscribe-events tcp://<hub-ip>:8887
```

### Reference
### [CLI Options](https://www.selenium.dev/documentation/grid/configuration/cli_options/)
### [Driver Configurations](https://www.selenium.dev/documentation/webdriver/drivers/)

### [Grid Components](https://www.selenium.dev/documentation/grid/components/)

### [Starting Grid](https://www.selenium.dev/documentation/grid/getting_started/#standalone)

### [Grid Docker Image](https://hub.docker.com/r/selenium/hub)

Install docker
```bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start

sudo usermod -aG docker ec2-user
docker network create Grid

docker run -d -p 4442-4444:4442-4444 --net Grid --name selenium-hub selenium/hub:latest

docker run -d --net Grid -e SE_EVENT_BUS_HOST=selenium-hub \
    --shm-size="2g" \
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 \
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \
    selenium/node-firefox:latest
```

## Log4J

Log4J

<iframe src="https://toolsqa.com/selenium-webdriver/log4j-introduction/" width="100%" height="3220px" scrolling="no"></iframe>

## Maven 

### POM(Project Object Model)
- Maven builds a project using its project object model (POM) 

### Advantages

- Simple project setup that follows best practices.
- Keeping test source code in a separate and parallel to the main code.
- Using test case naming conventions to locate and execute tests.
- Having test cases setup their environment instead of customizing the build for test preparation.
- Assists in project workflow such as release and issue management.
- Able to easily work with multiple projects at the same time.
- Coherent site of project information
- Dependency management

### Installation
```Bash
brew install maven
````

### Commands
```Maven
mvn verify
mvn clean install
mvn compile
mvn test
mvn test-compile
mvn package
mvn install
mvn clean
```
### Reference 
![Maven Official site](https://maven.apache.org/)

### Java Project
```maven
mvn archetype:generate -DarchetypeGroupId=com.mail.automation -DarchetypeArtifactId=com-botcat-automation -DgroupId=mail.automation -DartifactId=EMailAutomation -Dversion=1.0-SNAPSHOT
```
