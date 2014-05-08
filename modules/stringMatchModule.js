//Checks how closely two strings match and returns a score based on that.

//The closer the match the lower the score. A score of 0 means a perfect match.
var compareStrings = function(str1, str2){
    
    var mismatch = 0;
    //var penalty = 2;
    var bonus = 0.1;
    
    if (str1 != str2){
        var str1_array = cleanString(str1.toLowerCase());
        var str2_array = cleanString(str2.toLowerCase());
        
        var difference = differenceInLengths(str1_array, str2_array)
        
        //increases the length of the smaller array to that of the longer array
        if (str1_array.length < str2_array.length){
            str1_array = equalizeLength(str1_array, difference);
        }
        else if (str2_array.length < str1_array.length){
            str2_array = equalizeLength(str2_array, difference);
        }
        
        //checks how many strings match between the two arrays of strings
        for (var i=0; i < str1_array.length; i++){
            
            //penalizes only if a string given its index in one array does not match
            //with the string for the same index in the other array
            if (str1_array[i] != str2_array[i]){
                
                mismatch = mismatch + (compareWords(str1_array[i],str2_array[i]))/str1_array[i].length;
                
                //reduces the penalty if a nearby character is the same
                //this will be important if the user had made a typo
                if (i === 0 && (str1_array[i] === str2_array[i+1])){
                    mismatch = mismatch - bonus;
                }
                if (i === str1_array.length - 1 && (str1_array[i] === str2_array[i-1])){
                    mismatch = mismatch - bonus;
                }
                if (i > 0 && i < str1_array.length-1 && ((str1_array[i] === str2_array[i+1]) || (str1_array[i] === str2_array[i-1]))){
                    mismatch = mismatch - bonus;
                }
            }
        }
        
    }
    return mismatch;
};




//Checks how closely two words match and returns a score based on that.
//The closer the match the lower the score. A score of 0 means a perfect match.
var compareWords = function(word1, word2){
    
    var score = 0;
    var difference = differenceInLengths(word1, word2);
    
    if (word1 != word2){
        //splits the words into characters
        var word1_array = word1.split("");
        var word2_array = word2.split("");
        
        //increases the length of the smaller array to that of the longer array
        if (word1_array.length < word2_array.length){
            word1_array = equalizeLength(word1_array, difference);
        }
        else if (word2_array.length < word1_array.length){
            word2_array = equalizeLength(word2_array, difference);
        }
        
        score = match(word1_array, word2_array);
    }
    return score;
};

//Checks how closely the two strings match and returns a score based on that.
//The lower the score the closer is the match, with 0 being the lowest score.
var match = function(word1_array, word2_array){
    var mismatch = 0;
    var penalty = 1;
    var bonus = 0.5;
    
    //checks how many characters match between the two arrays of characters
    for (var i=0; i < word1_array.length; i++){
        
        //penalizes only if a character given its index in one array does not match
        //with the character for the same index in the other array
        if (word1_array[i] != word2_array[i]){
            
            mismatch = mismatch + penalty;
            
            //reduces the penalty if a nearby character is the same
            //this will be important if the user had made a typo
            if (i === 0 && (word1_array[i] === word2_array[i+1])){
                mismatch = mismatch - bonus;
            }
            if (i === word1_array.length - 1 && (word1_array[i] === word2_array[i-1])){
                mismatch = mismatch - bonus;
            }
            if (i > 0 && i < word1_array.length-1 && ((word1_array[i] === word2_array[i+1]) || (word1_array[i] === word2_array[i-1]))){
                mismatch = mismatch - bonus;
            }
        }
    }
    
    return mismatch;
};


//Splits a string into its substrings (if there are any).
//Removes white spaces and non-alphanumeric characters from the string.
//Returns: an array of strings
var cleanString = function(str){
    var split_strings = splitString(str);
    var strings = removeCharacters(split_strings);
    
    return strings;
};


//Splits a given string. Removes every white space from a string and returns an array of strings.
//Returns: an array of strings
var splitString = function(str){
    var string_array = str.split(" ");
    var new_array = [];
    
    //removes every unnecessary string from the oiginal array and puts it in a new array.
    for (var i=0; i<string_array.length;i++){
        if (string_array[i] != "") {
            new_array.push(string_array[i]);
        }
    }
    return new_array;
};

//Removes non-alphanumeric characters from strings.
//It takes an array of string as an argument
//Returns: an array of strings
var removeCharacters = function(string_array){
    var new_array = [];
    
    for (var i=0; i<string_array.length; i++){
        new_array.push(string_array[i].replace(/\W/g,''));
    }
    
    return new_array;
};


//Checks the difference between the length of two strings or arrays
//Arguments: takes two objects
//Returns: difference between the length of the objects
var differenceInLengths = function(item1, item2){
    var difference = Math.abs(item1.length - item2.length);
    return difference;
};


//Increases the length of an array of characters by adding white spaces to the array.
//Arguments: an array of characters and an integer (the integer specifies the number of times white space should be added)
var equalizeLength = function(array, difference){
    for (var i=0; i<difference; i++){
        array.push(" ");
    };
    return array;
};


//converts the time to a numeric form so it can be compared with other times
var timeConverter = function(hr,min,mdn){
    var hour = hr;
    var minute = min;
    var meridian = mdn;
    
    //any time that is in pm is converted to a 24 hour scale
    if (meridian === "pm" && hour != 12){
        hour = hour + 12;
    }
    
    //assigns a value of 0 hour to 12am
    if (meridian === "am" && hour === 12){
        hour = 0;
    }
    
    //the time s converted to a decimal number, where the numbers before the decimal represents the hour
    //and the numbers after the decimal represents minutes
    var time = (hour + (minute/60))/24;
    
    return time;
};



module.exports.compareStrings = compareStrings;
module.exports.compareWords = compareWords;
module.exports.match = match;
module.exports.cleanString = cleanString;
module.exports.splitString = splitString;
module.exports.removeCharacters = removeCharacters;
module.exports.differenceInLengths = differenceInLengths;
module.exports.equalizeLength = equalizeLength;
module.exports.timeConverter = timeConverter;