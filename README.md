# PantinVR
Giving diziness to bar patrons withou a drop of alcohol!

##To do
* define goal
 * make patrons experience VR?
* <del>add boilerplate
 * <del>cf http://vatelier.net/MyDemo/edits.html as it uses it + tweaning + STLloader
 * consider bower or even npm instead of having a ./js directory of imports
  * bower install webvr-boilerplate https://github.com/borismus/webvr-boilerplate
* test boilerplate on git pages
 * cf https://help.github.com/categories/github-pages-basics/
 * <del>works on http://vatelier.net/MyDemo/PantinVR/
* define path structure
 * array of positions + optionally action (e.g. ask user input)
  * {pos: [10,10,10], action: RequestDecision}
  * {pos: [15,10,05]}
  * {pos: [15,10,-5], action: PathSplit}
