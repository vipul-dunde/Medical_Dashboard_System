"use strict";

function hack_func1(hack_var1, hack_var2) {
  var hack_arr = [];

  for (var i = hack_var1; i <= hack_var2; i++) {
    hack_arr.push(i);
  }

  var replace_array = [];
  hack_arr.forEach(function (hack_var3) {
    if (hack_func2(hack_var3)) replace_array.push(hack_var3);
  });
  return replace_array;
}

function hack_func2(hack_var3) {
  if (hack_var3 % 4 === 0 && hack_var3 % 100 !== 0 || hack_var3 % 100 === 0 && hack_var3 % 400 === 0) {
    return hack_var3;
  } else {
    return false;
  }
}

prompt(hack_func1(5000, 5012));