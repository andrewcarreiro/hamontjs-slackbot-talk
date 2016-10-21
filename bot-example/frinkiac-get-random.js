var request = require('request-promise');

module.exports = function () {
	return getRandomFrinkiac()
		.then( ( result ) => {
			return {
				"image" : getImageUrl(result),
				"date" : result.Episode.OriginalAirDate,
				"subtitles" : result.Subtitles.map( ( s ) => s.Content )
			};
		})
	.catch( (err) => console.error(err) );
}

function getRandomFrinkiac() {
	return request({
		"url" : "https://frinkiac.com/api/random",
		"json" : true
	})
}

function getImageUrl( frinkiacData ){
	return `https://frinkiac.com/img/${frinkiacData.Episode.Key}/${frinkiacData.Frame.Timestamp}.jpg`;
}