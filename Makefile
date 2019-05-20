NAME := "workers-docs"
URLPATH := "/workers"

.PHONY: deploy build clean serve

IS_LINUX := $(shell if go version | grep -q linux; then echo true; fi)
HUGO := $(shell command -v hugo 2>/dev/null)

V ?= 1 # When V is 1, print commands and build progress.
Q := $(if $V,,@)

bin/hugo:
	$Q mkdir bin || true

ifneq ($(IS_LINUX),)
	# this Hugo version should match README.md
	$Q curl -Ls https://github.com/gohugoio/hugo/releases/download/v0.32.2/hugo_0.32.2_Linux-64bit.tar.gz | tar xz -C bin/ hugo
else ifneq ($(HUGO),)
	$Q ln -s $(HUGO) bin/hugo
else
	$(error "To build docs install Hugo per README.md.")
endif

build: bin/hugo
	$Q npm run build
	$Q bin/hugo

deploy: build
	$Q gsutil -m rsync -d -r ./public "gs://docs-staging.workers-tooling.cf"

# clean up generated files, to allow regeneration
clean:
	$Q rm -rf public

serve: bin/hugo | node_modules
	$Q PATH="$$PWD/bin:$$PATH" npm start

node_modules:
	npm install
