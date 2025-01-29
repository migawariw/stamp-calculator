// 組み合わせを計算する関数
function solveEquation(coefficients, target, maxValues) {
	let solutions = [];

	// 全ての組み合わせを生成
	const ranges = maxValues.map(value => [...Array(value + 1).keys()]);  // 0からmaxValueまでの配列を生成
	const combinations = cartesianProduct(ranges);

	// 条件を満たす組み合わせを探す
	for (const combination of combinations) {
			const sum = combination.reduce((acc, val, idx) => acc + val * coefficients[idx], 0);
			if (sum === target) {
					solutions.push(combination);
			}
	}

	return solutions;
}

// 笛積（Cartesian Product）を計算する関数
function cartesianProduct(arrays) {
	return arrays.reduce((a, b) =>
			a.flatMap(d => b.map(e => [...d, e]))
	, [[]]);
}

// フォームの送信を処理
document.getElementById('inputForm').addEventListener('submit', function(event) {
	event.preventDefault();

	// ユーザー入力を取得
	const targetValues = document.getElementById('target').value.split(/[,.]/).map(Number);  // カンマまたはピリオド区切り
	const coefficients = document.getElementById('coefficients').value.split(/[,.]/).map(Number);  // ピリオドも区切り文字に
	const maxValues = document.getElementById('maxValues').value.split(/[,.]/).map(Number);  // ピリオドも区切り文字に

	let resultHTML = '<h2>切手の枚数の組み合わせ:</h2>';
	resultHTML += '<table class="result-table">';
	
	// 1行目: 切手の値段
	resultHTML += '<tr>';
	coefficients.forEach(coeff => {
			resultHTML += `<th>${coeff}円</th>`;
	});
	resultHTML += '<th>合計額</th>';
	resultHTML += '</tr>';
	
	// 各目標金額に対して組み合わせを計算
	targetValues.forEach(target => {
			const solutions = solveEquation(coefficients, target, maxValues);

			// 各組み合わせを表示
			solutions.forEach((sol) => {
					const totalAmount = sol.reduce((sum, count, idx) => sum + (coefficients[idx] * count), 0);
					resultHTML += '<tr>';
					sol.forEach(count => {
							resultHTML += `<td>${count}</td>`;
					});
					resultHTML += `<td>${totalAmount}</td>`;
					resultHTML += '</tr>';
			});
	});

	resultHTML += '</table>';

	// 結果を表示
	const resultDiv = document.getElementById('result');
	if (resultHTML.includes('<tr>')) { // 結果が存在する場合
			resultDiv.innerHTML = resultHTML;
	} else {
			resultDiv.innerHTML = '<h2>条件を満たす組み合わせが見つかりませんでした。</h2>';
	}
});



// 連続する整数を生成する関数
function generateSequence() {
	const a = parseInt(document.getElementById('a').value);
	const b = parseInt(document.getElementById('b').value);
	let result = [];

	// bが正の場合
	if (b > 0) {
			for (let i = a; i <= a + b; i++) {
					result.push(i);
			}
	}
	// bが負の場合
	else if (b < 0) {
			for (let i = a; i >= a + b; i--) {
					result.push(i);
			}
	}

	// 結果を表示
	document.getElementById('output').textContent = result.join(', ');
}
