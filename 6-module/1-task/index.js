/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  createTable() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    table.append(thead);
    let tr = document.createElement('tr');
    thead.append(tr);
    let th1 = document.createElement('th');
    th1.innerHTML = 'Имя';
    let th2 = document.createElement('th');
    th2.innerHTML = 'Возраст';
    let th3 = document.createElement('th');
    th3.innerHTML = 'Зарплата';
    let th4 = document.createElement('th');
    th4.innerHTML = 'Город';
    tr.append(th1);
    tr.append(th2);
    tr.append(th3);
    tr.append(th4);

    let tbody = document.createElement('tbody');
    for (let i = 0; i < this.rows.length; i++) {
      let tr = document.createElement('tr');
      for (let value of Object.values(this.rows[i])) {
        let td = document.createElement('td');
        td.innerHTML = value;
        tr.append(td);
      }
      let tdLast = document.createElement('td');
      tdLast.innerHTML = '<button>X</button>';
      tr.append(tdLast);
      tdLast.addEventListener('click', () => tr.remove());

      tbody.append(tr);
    }

    table.append(tbody);
    return table;
  }

  constructor(rows) {
    this.rows = rows;
    this.result = this.createTable();
  }


  get elem() {
    return this.result;
  }

}

