
function Bombcell() {
    this.row = 0;
    this.cell = 0;
}


function gameAreaHelper(rowcount, cellcount, idname)
{
    this.bombs = new Array();
    this.isGameOver = false;
    this.mascells = new Array();
    this.rowcount = rowcount;
    this.cellcount = cellcount;
    this.idname = idname;
    this.bombsCount = 0;
    this.clearCellsCount = 0;
    this.openCellsCount = 0;

    this.createarea = function ()
    {


        var table = document.createElement('table');
        table.setAttribute("border", "1");
        var row = new Array();
        for (i = 0; i < this.rowcount; i++)
        {
            var currow = document.createElement('tr');
            for (j = 0; j < this.cellcount; j++)
            {
                var curtd = document.createElement('td');
                curtd.setAttribute("width", "30px");
                curtd.setAttribute("height", "40px");
                var idtd = i.toString() + j.toString();
                curtd.setAttribute("id", idtd);
                curtd.style.backgroundColor = "red";


                currow.appendChild(curtd);
            }

            row.push(currow);
        }

        for (i = 0; i < row.length; i++)
        {
            table.appendChild(row[i]);
        }

        var el = document.getElementById(this.idname);
        el.appendChild(table);



    }

    this.resetGame = function ()
    {


        var div = document.getElementById('table');
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        this.bombs.length = 0;
        this.createarea(this.rowcount, this.cellcount);
        this.createBombs(this.bombsCount);
        this.isGameOver = false;


    }

    this.clearGame = function ()
    {
        var div = document.getElementById('table');
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        this.openCellsCount = 0;
        var result3 = document.getElementById("totalcount");
        result3.innerText = 0;
        var result5 = document.getElementById("cellscount");
        result5.innerText = 0;
        this.bombs.length = 0;
        this.bombsCount = 0;
        this.clearCellsCount = 0;

    }


    this.openAllCells = function ()
    {
        var clearcells = new Array();
        var maindiv = document.getElementById("table");
        var tds = maindiv.getElementsByTagName("td");
        var flag = false;
        for (i = 0; i < tds.length; i++)
        {
            var flag = false;
            var idtd = tds[i].getAttribute("id");
            var row = idtd[0];
            var cell = idtd[1];

            for (j = 0; j < this.bombs.length; j++)
            {

                if (row == this.bombs[j].row && cell == this.bombs[j].cell) {

                    var el = document.getElementById(idtd);
                    el.style.backgroundColor = "green";
                    el.innerText = "X";

                    flag = true;

                    break;


                }
            }

            if (flag == false)
            {
                clearcells.push(tds[i].getAttribute("id"));
            }

        }


        for (h = 0; h < clearcells.length; h++)
        {

            var id = clearcells[h];

            var row = parseInt(id[0]);
            var cell = parseInt(id[1]);
            this.sub(row, cell);
            var counts = this.countcells();
            var tdd = document.getElementById(id);
            tdd.style.backgroundColor = "white";
            tdd.innerText = counts;
            this.mascells.length = 0;

        }

        alert("gameover");
        this.isGameOver = true;




    }



    this.createBomb = function ()
    {

        if (this.bombs.length == 0)
        {
            var a = Math.floor((Math.random() * this.rowcount) + 0);
            var b = Math.floor((Math.random() * this.cellcount) + 0);
            var bomb = new Bombcell();
            bomb.row = a;
            bomb.cell = b;
            return bomb;
        }
        var flag = false;
        while (flag == false)
        {
            var a = Math.floor((Math.random() * this.rowcount) + 0);
            var b = Math.floor((Math.random() * this.cellcount) + 0);
            var flag2 = false;
            for (i = 0; i < this.bombs.length; i++) {
                if (this.bombs[i].row == a && this.bombs[i].cell == b) {
                    flag2 = true;

                }

            }
            if (flag2 == true)
            {
                continue;
            }
            else
            {
                var bomb = new Bombcell();
                bomb.row = a;
                bomb.cell = b;
                return bomb;

            }
        }


    }
    this.createBombs = function (colbombs)
    {
        for (i = 0; i < colbombs; i++)
        {

            this.bombs.push(this.createBomb());


        }
        this.bombsCount = colbombs;
        this.clearCellsCount = (this.rowcount * this.cellcount) - this.bombsCount;
        var result3 = document.getElementById("totalcount");
        result3.innerText = this.clearCellsCount.toString();



        this.openCellsCount = 0;
        var result = document.getElementById("cellscount");
        result.innerText = this.openCellsCount.toString();

    }

    this.openCell = function (id)
    {
        if (this.isGameOver == false)
        {

            rows = parseInt(id[0]);
            cells = parseInt(id[1]);



            for (i = 0; i < this.bombs.length; i++)
            {
                if (rows == this.bombs[i].row && cells == this.bombs[i].cell)
                {

                    var el = document.getElementById(id);
                    el.style.backgroundColor = "green";
                    el.innerText = "X";

                    this.openAllCells();
                    return;



                }

            }


            this.sub(rows, cells);

            var counts = this.countcells();

            var tdd = document.getElementById(id);
            tdd.style.backgroundColor = "white";
            tdd.innerText = counts;
            this.mascells.length = 0;
            this.openCellsCount++;
            var result = document.getElementById("cellscount");
            result.innerText = this.openCellsCount.toString();
            if (this.openCellsCount == this.clearCellsCount)
            {
                alert("winner game");
            }
        }
    }

    this.sub = function (rows, cells)
    {

        if ((rows - 1) >= 0) {
            var td = new Bombcell();
            td.row = rows - 1;
            td.cell = cells;
            this.mascells.push(td);
        }

           if ((rows + 1) <= this.rowcount - 1)
        {
            var td = new Bombcell();
            td.row = rows + 1;
            td.cell = cells;
            this.mascells.push(td);
        }



        if ((cells + 1) <= this.cellcount - 1)
        {
            var td = new Bombcell();
            td.row = rows;
            td.cell = cells + 1;
            this.mascells.push(td);

        }

        if ((cells - 1) >= 0) {
            var td = new Bombcell();
            td.row = rows;
            td.cell = cells - 1;
            this.mascells.push(td);
        }


    }

    this.countcells = function ()
    {

      var count = 0;

     for (i = 0; i < this.mascells.length; i++)
        {
            row1 = this.mascells[i].row;
            cell1 = this.mascells[i].cell;
            var flag = false;
            for (j = 0; j < this.bombs.length; j++)
            {
                if (row1 == this.bombs[j].row && cell1 == this.bombs[j].cell)
                {
                    flag = true;
                    break;
                }
            }
            if (flag == false)
            {
                count = count + 1;

            }


        }

        return count;

    }
}