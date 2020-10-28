           (function(){
           	'use strickt';
           	let n; 
           	let i; 
           	let flag = true; 
            const actie = prompt('(G)enereren of (V)erifiëren');
            // Getting the value form the 
            // text field using DOM 
            if (actie == 'V') {n = prompt("Geef een getal in");
             n = parseInt(n) 
            for (i = 2; i <= n - 1; i++) 
                if (n % i == 0) { 
                    flag = false; 
                    break; 
                    // Check and display output 
            if (flag == true) 
                console.log(n + " is een priemgetal"); 
            else
                console.log(n + " is geen priemgetal"); }

           })();

           
        
