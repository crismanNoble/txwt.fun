# txwt.fun
after downloading images into /docs/folder, and adding the foldername to people_lookup, 
do `resize_images 800 . .800.jpg` in the /docs/images
and then dont git add the whole folder, just `git add ./docs/images/**/*.800.jpg`, `git add ./docs/images/**/*.mov`, `git add ./docs/images/**/*.MP4`, `git add ./docs/images/**/*.mp4`,

For a new year:
save the rendered html in index.html to /year/index.html, move all images from that year into /year/ folder under images, and updated the rendered out html until it works.

With New data:
update the people_lookup.json manually or using a spreadsheet to help maybe
(how tf did movie list.json ever get created?)
put new images into /year/ folder (run gulp image_crawl, change year in gulp task)