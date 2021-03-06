'use strict';

module.exports = () => {
	return `version: 2
jobs:
  test:
    docker:
      - image: 'circleci/node:10-browsers'
    steps:
      - checkout
      - run: npm install --only=dev
      - run: npx origami-ci branch
  publish_to_npm:
    docker:
      - image: 'circleci/node:10'
    steps:
      - checkout
      - run: npm install --only=dev
      - run: npx origami-ci release
workflows:
  version: 2
  test:
    jobs:
      - test
      - publish_to_npm:
          filters:
            tags:
              only: /^v.*/
            branches:
              ignore: /.*/
`;
};
