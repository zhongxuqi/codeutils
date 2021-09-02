default: release

release:
	npm run build
	cd dist && tar zcvf codeutils.tar.gz * && cd ..

deploy: release
	scp dist/codeutils.tar.gz zhongxuqi@47.97.68.46:~/
