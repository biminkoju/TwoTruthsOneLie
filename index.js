const container = document.createElement('div');
document.body.appendChild(container);
const optionList = document.createElement('div');
let setNo;

fetch('index.json')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		jsonData = data; // Assign setNo value here
		start();
	})
	.catch((err) => {
		console.error(err);
	});

function start() {
	const startButton = document.createElement('button');
	startButton.textContent = 'Start';
	container.appendChild(startButton);
	startButton.addEventListener('click', () => {
		container.removeChild(startButton);
		question();
	});
}
function question() {
	container.innerHTML = '';
	optionList.innerHTML = '';
	setNo = Math.floor(Math.random() * Object.keys(jsonData).length) + 1;
	const check = document.createElement('button');
	check.textContent = 'check';
	const options = document.createElement('div');

	const option = [
		jsonData[`set${setNo}`].truth1,
		jsonData[`set${setNo}`].truth2,
		jsonData[`set${setNo}`].lie,
	];

	for (let i = option.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[option[i], option[j]] = [option[j], option[i]];
	}

	for (let i = option.length - 1; i >= 0; i--) {
		const optionLabel = document.createElement('label');
		optionLabel.className = 'option';

		const radio = document.createElement('input');
		radio.type = 'radio';
		radio.name = 'option';
		radio.value = option[i];

		const optionText = document.createTextNode(option[i]);

		optionLabel.appendChild(radio);
		optionLabel.appendChild(optionText);
		options.appendChild(optionLabel);
		options.appendChild(document.createElement('br'));
	}
	optionList.appendChild(options);
	optionList.appendChild(check);
	container.appendChild(optionList);
	check.addEventListener('click', checkAns);
}
function checkAns() {
	const selectedOption = document.querySelector(
		'input[name="option"]:checked'
	);
	if (selectedOption) {
		const result = document.createElement('div');
		const correct = document.createElement('p');
		correct.innerHTML = `you figured out the false statement`;
		const incorrect = document.createElement('p');
		incorrect.innerHTML = `you did not figure out the false statement`;

		const againButton = document.createElement('button');
		againButton.textContent = 'again?';
		container.appendChild(againButton);

		const mainPageButton = document.createElement('button');
		mainPageButton.textContent = 'main page';
		container.appendChild(mainPageButton);

		if (selectedOption.value === jsonData[`set${setNo}`].lie) {
			result.appendChild(correct);
			container.appendChild(result);
		} else {
			result.appendChild(incorrect);
			container.appendChild(result);
		}

		// Remove optionList and buttons after result
		container.removeChild(optionList);

		// Event listener for "again?" button
		againButton.addEventListener('click', () => {
			container.removeChild(againButton);
			container.removeChild(mainPageButton);
			container.removeChild(result);
			question();
		});

		// Event listener for "main page" button
		mainPageButton.addEventListener('click', () => {
			container.removeChild(againButton);
			container.removeChild(mainPageButton);
			container.removeChild(result);
			start();
		});
	}
}
