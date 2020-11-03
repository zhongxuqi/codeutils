default: release

release:
	yarn build
	cd dist && tar zcvf codeutils.tar.gz * && cd ..

deploy:
	scp dist/codeutils.tar.gz zhongxuqi@47.97.68.46:~/
