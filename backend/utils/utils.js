const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

const errorMessage400 = 'Переданные данные некорректны';
const errorMessage404 = 'Запрашиваемый ресурс не найден';
const errorMessage500 = 'Произошла ошибка на сервере';

const checkErrors = (res, err) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(ERROR_CODE_400).send({ message: errorMessage400 });
  } else if (err.message === 'notValidId') {
    res.status(ERROR_CODE_404).send({ message: errorMessage404 });
  } else {
    res.status(ERROR_CODE_500).send({ message: errorMessage500 });
  }
};

module.exports = {
  ERROR_CODE_404,
  errorMessage404,
  checkErrors,
};
