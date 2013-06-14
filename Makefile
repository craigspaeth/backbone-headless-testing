test-unit:
	./node_modules/mocha/bin/mocha test/unit --require should

test-integration:
	NODE_ENV=test ./node_modules/mocha/bin/mocha test/integration --require should

test:
	make test-unit
	make test-integration

.PHONY: test