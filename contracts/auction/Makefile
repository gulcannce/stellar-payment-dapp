default: build

all: test

test: build
	cargo test

build:
	# registry önce derlenmeli: auction, contractimport! ile onun derlenmiş
	# wasm'ını okuyor (bkz. src/lib.rs).
	stellar contract build --package registry
	stellar contract build --package auction
	@ls -l ../../target/wasm32v1-none/release/*.wasm

fmt:
	cargo fmt --all

clean:
	cargo clean
