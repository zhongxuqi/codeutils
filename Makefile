default: release

release:
	yarn build
	cd dist && tar zcvf codeutils.tar.gz * && cd ..

deploy:
	scp dist/codeutils.tar.gz zhongxuqi@47.96.13.26:~/
