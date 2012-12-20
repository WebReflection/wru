test([{
  name: "base 1",
  test: function () {
    assert("OK");
  }
}]);
wru.test([{
  name: "base 2",
  test: function () {
    wru.assert("OK");
  }
}]);