const multiplicar = async (base) => {
    let result = '';
    for (let i = 1; i <= 10; i++) {
        result += `${base} x ${i} = ${base * i}\n`;
    }
    return result;
};

module.exports = { multiplicar };

  