# PantinVR
Giving diziness to bar patrons withou a drop of alcohol!

##To do
* define goal
 * **A virtual pantin as a Tron/GitS theme park.**
 * make patrons experience home made VR?
 * for us: an experimentation plateform to build upon (adding scenes and features bits by bits), to explore graphics possibilities.
 * A ghost in the shell (and tron) esthetic for a virtual pantin.
 * A virtual place to meet and interact in a playful manner
 * Little sceneries to amaze (Mr Div like) => a la "demo scene"
* <del>add boilerplate
 * <del>cf http://vatelier.net/MyDemo/edits.html as it uses it + tweaning + STLloader
 * <del>consider bower or even npm instead of having a ./js directory of imports
  * <del>bower install webvr-boilerplate https://github.com/borismus/webvr-boilerplate
* <del>test boilerplate on git pages. Because need server side stuff.
 * <del>cf https://help.github.com/categories/github-pages-basics/
 * <del>works on http://vatelier.net/MyDemo/PantinVR/
* Dealing with movement of users (R)
 * <del>define path structure
  * <del>array of positions + optionally action (e.g. ask user input)
   * <del>{pos: [10,10,10], action: RequestDecision}
 * Link camera and player.position / lookingAt
 * Basic movements based on gaze (the more frontal you look, the faster you get)
 * Explore centered reticle (long gaze) for interaction (test interaction = stoping/starting moving)
* handle multiple users (R)
 * Make a test connection with socket.io
 * Chose if update whole state of the world (users' positions) each time or just when movement is happening (absolu Vs relative).
 * Implement it!
 * rule: first connected user in control and following users watching
 * users.json
  * {id: 1, x: 1, y: 2, z: -1, role: leader}
  * {id: 2, x: 5, y: 5, z: 5, role: viewer}
* load("pantin.stl"); (F)
* Defining and designing Actions (F)
 * Killer7 style
* merge this file with https://github.com/OpenTechSchool-Brussels/virtual_pantin
