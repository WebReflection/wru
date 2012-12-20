.PHONY: clean test

# default build task
build:
	mkdir -p build
	node builder/build.js
	make test

# clean/remove build folder
clean:
	rm -rf build

# test build folder
test:
	node node/program.js test/base.js
