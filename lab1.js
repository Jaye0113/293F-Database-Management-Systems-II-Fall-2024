//Q1 create sample data items for the data types 
let sensorReadings = [22.4, 50.3];
let cropPhoto = "data:image/png;base64,...";
let farmerNote = "Monitored the water levels, noticed slight decrease in humidity.";
let gpsCoordinates = 40.7128;
let timestamp = new Date();


/* Q2 Store the following agricultural data types in IndexedDB: sensor readings, crop photos, farmer notes, GPS coordinates, and timestamps.
Please upload a screen of the browser IndexedDB data.*/
let request = indexedDB.open("AgricultureDB", 1);

request.onupgradeneeded = function(event) {
    let db = event.target.result;

    // 创建一个对象存储区
    let objectStore = db.createObjectStore("FarmData", { keyPath: "id", autoIncrement: true });

    // 定义对象存储区中的字段
    objectStore.createIndex("sensorReadings", "sensorReadings", { unique: false });
    objectStore.createIndex("cropPhoto", "cropPhoto", { unique: false });
    objectStore.createIndex("farmerNote", "farmerNote", { unique: false });
    objectStore.createIndex("gpsCoordinates", "gpsCoordinates", { unique: false });
    objectStore.createIndex("timestamp", "timestamp", { unique: false });
};

request.onsuccess = function(event) {
    let db = event.target.result;

    // 开启一个事务并添加数据
    let transaction = db.transaction(["FarmData"], "readwrite");
    let objectStore = transaction.objectStore("FarmData");

    let data = {
        sensorReadings: [22.4, 50.3],
        cropPhoto: "data:image/png;base64,...",
        farmerNote: "Monitored the water levels, noticed slight decrease in humidity.",
        gpsCoordinates: 40.7128,
        timestamp: new Date()
    };

    objectStore.add(data);
};

request.onerror = function(event) {
    console.log("Error opening IndexedDB:", event.target.errorCode);
};

/*Q3Retrieve the stored data from FarmData and log it to the browser console to confirm that the data has been saved correctly.
 Ensure that all data types (array, image, string, number, and date) 
 are accurately logged and formatted in the console. Upload a screenshot of the browser console showing the successfully retrieved data. */
 // Read data
 let request = indexedDB.open("AgricultureDB", 1);

 request.onsuccess = function(event) {
     let db = event.target.result;
 
     // 开启一个事务并获取对象存储区
     let transaction = db.transaction(["FarmData"], "readonly");
     let objectStore = transaction.objectStore("FarmData");
 
     // 获取所有记录
     let getAllRequest = objectStore.getAll();
 
     getAllRequest.onsuccess = function(event) {
         let data = event.target.result;
         console.log("Retrieved data from FarmData:", data);
     };
 
     getAllRequest.onerror = function(event) {
         console.log("Error retrieving data:", event.target.errorCode);
     };
 };
 
 request.onerror = function(event) {
     console.log("Error opening IndexedDB:", event.target.errorCode);
 };

 /*Q4Write five unit test functions to validate the correctness of your data. 
 Your tests cover various scenarios and edge cases. After completing the tests, upload a screenshot of the unit test code. */
 // Test 1: Validate sensorReadings array
function testSensorReadings() {
    let expected = [22.4, 50.3];
    let result = retrievedData.sensorReadings;
    console.assert(JSON.stringify(result) === JSON.stringify(expected), "Test 1 Failed: Sensor readings do not match");
}

// Test 2: Validate cropPhoto is a Base64 string
function testCropPhoto() {
    let result = retrievedData.cropPhoto;
    console.assert(result.startsWith("data:image/png;base64,"), "Test 2 Failed: Crop photo is not in Base64 format");
}

// Test 3: Validate farmerNote string
function testFarmerNote() {
    let expected = "Monitored the water levels, noticed slight decrease in humidity.";
    let result = retrievedData.farmerNote;
    console.assert(result === expected, "Test 3 Failed: Farmer note does not match");
}

// Test 4: Validate gpsCoordinates is a number
function testGpsCoordinates() {
    let expected = 40.7128;
    let result = retrievedData.gpsCoordinates;
    console.assert(result === expected, "Test 4 Failed: GPS coordinates do not match");
}

// Test 5: Validate timestamp is a Date object
function testTimestamp() {
    let result = retrievedData.timestamp;
    console.assert(result instanceof Date, "Test 5 Failed: Timestamp is not a Date object");
}

// Example of running all tests
function runAllTests() {
    testSensorReadings();
    testCropPhoto();
    testFarmerNote();
    testGpsCoordinates();
    testTimestamp();
    console.log("All tests executed");
}

