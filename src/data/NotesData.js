var notesData = [
	{
		'key': 'a',
		'idNotes': '1',
		'title': 'Daily Standup',
		'description': 'Memperbaiki Tampilan Design pada Device',
		'date': '2 Juli 2019',
		'category': 'Work',
		'color': ''
	},
	{
		'key': 'b',
		'idNotes': '2',
		'title': 'Windows 10',
		'description': 'Upgarde Windows 10 ke Update May berkode 1903',
		'date': '23 Agustus 2019',
		'category': 'Wishlist',
		'color': ''
	},
	{
		'key': 'c',
		'idNotes': '3',
		'title': 'Belajar Bahasa Jepang',
		'description': 'Belajar Bahasa Jepang mulai dari Kanji, Grammar, Kosakata, Hiragana, dan Katakana',
		'date': '3 Juli 2019',
		'category': 'Learn',
		'color': ''
	}
];

for (let i=0; i<notesData.length; i++) {
	if (notesData[i].category == 'Work') {
		notesData[i].color = '#C0EB6A'
	}else if (notesData[i].category == 'Learn') {
		notesData[i].color = '#2FC2DF'
	}else if (notesData[i].category == 'Wishlist') {
		notesData[i].color = '#FAD06C'
	}
}

module.exports = notesData;