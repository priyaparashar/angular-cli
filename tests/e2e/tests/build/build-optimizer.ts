import { ng } from '../../utils/process';
import { expectFileToMatch, expectFileToExist } from '../../utils/fs';
import { expectToFail } from '../../utils/utils';


export default function () {
  // TODO(architect): Delete this test. It is now in devkit/build-webpack.

  return ng('build', '--aot', '--build-optimizer')
    .then(() => expectToFail(() => expectFileToMatch('dist/main.js', /\.decorators =/)))
    .then(() => ng('build', '--prod'))
    .then(() => expectToFail(() => expectFileToExist('dist/vendor.js')))
    .then(() => expectToFail(() => expectFileToMatch('dist/main.js', /\.decorators =/)));
}
