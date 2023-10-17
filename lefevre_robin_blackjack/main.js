function sumTable(listeMain) {                          //Fonction qui permet de rendre la somme de la main du joueur ou du croupier
    let sum = 0

    for(let i = 0; i<listeMain.length ; i++){
        sum = sum + listeMain[i]
    }

    return sum
}

function probaMoitie() {                                    //Fonction qui va retourner une probabilité de 50%
    let proba = Math.floor(Math.random() * 100);            //Initie un nombre aléatoire entre 0 et 99 (100 nombres)
    let rep = ""

    if((proba) %2 == 0){                                    //J'utilise le fait que 50% des nombres entre 0 et 99 sont pairs
        rep = "oui"
    }else{
        rep = "non"
    }
    return rep
  }
  

function jeuBlockJack(play){

    let card_list = [                   // Je mets mon pack de cartes "en dehors de mon jeu" afin de jouer avec les cartes restantes lorsque je relance mon jeu
        1,2,3,4,5,6,7,8,9,10,10,10,10,
        1,2,3,4,5,6,7,8,9,10,10,10,10,
        1,2,3,4,5,6,7,8,9,10,10,10,10,
        1,2,3,4,5,6,7,8,9,10,10,10,10,
    ]
    
    card_list = _.shuffle(card_list)                                  //_.shuffle() permet de mélanger un tableau ajouté avec un script JS dans mon index.html

    console.clear()                    // J'efface ma console afin que ça soit clean pour une éventuelle deuxième partie

    if (play == "OUI"){
        
        console.log();("Bienvenue sur le jeu du BlockJack !");
        
        let mainUser =[]
        mainUser.push(card_list.shift())                                   //permet de prendre le premier élément de mon tableau contenant les cartes
        mainUser.push(card_list.shift())                                   //et de le retirer du tableau
        
        let mainCroupier = []
        mainCroupier.push(card_list.shift())
        mainCroupier.push(card_list.shift())
        
        let repiocher = ""
        
        let sumMainUser = sumTable(mainUser)                       //j'appelle ma fonction pour pouvoir manipuler la somme des mains du joueur et du croupier
        let sumMainCroupier = sumTable(mainCroupier)

        let probaCroupierRepioche = probaMoitie()
        
        
        
        console.log("Voici tes deux cartes : " + mainUser + "\nLa somme totale de ta main est de " + sumMainUser);
        console.log("Voici la première carte de la main du croupier : " + mainCroupier[0]);
        
        if (sumMainUser < 21 && sumMainCroupier < 21){   //Dans le cas où le joueur ou le croupier ne gagne pas directement (sans avoir repioché)
        
            for(let i = 0 ; i < 10 ; i++){               //Boucle qui va permettre à l'utilisateur de repiocher
                                           
                if(sumMainUser < 21){                    //Cela permet de ne pas avoir à écrire "non" dans le cas où, après avoir piocher, notre main vaut 21
                repiocher = prompt("Souhaites-tu repiocher une carte ? (oui/non)").toUpperCase()
            
                    if(repiocher == "OUI"){
            
                        mainUser.push(card_list.shift())            
                        sumMainUser = sumTable(mainUser)
            
                        console.log("Voici ta nouvelle main : " + mainUser + "\nLa somme totale de ta main est de " + sumMainUser);
            
                        if (sumMainUser > 21){
                            console.log("Perdu ! \nLa somme de ta main est supérieur à 21.");
                            i = i+10                                //Permet de sortir de ma boucle et avancer dans le jeu
                        }
                        
                    }
                    else if(repiocher == "NON"){
                        sumMainUser = sumTable(mainUser)
                        i = i+10                                    //Permet de sortir de ma boucle et avancer dans le jeu
                    }
                    else{
                        console.log("Erreur d'entrée");
                    }
                }
        
            }
        
            if(sumMainCroupier > sumMainUser){                      //Dans le cas où après avoir pioché, la main de base de croupier bat celle du joueur
        
                console.log("Voici la main du croupier : " + mainCroupier + ".\nLe croupier gagne la partie ! La somme de sa main est de " + sumMainCroupier);
        
            }
            else if (sumMainUser == 21){                           //Dans le cas où, après avoir pioché, le joueur a eu 21
                console.log("Félicitations tu as gagné, la main du croupier était " + mainCroupier);
            }
            else if((sumMainCroupier <= 17 && sumMainUser < 21) || (probaCroupierRepioche == "oui" && sumMainUser < 21)){  //Dans le cas où la main du croupier vaut 17 ou moins et que le joueur n'a pas gagné
                                                                                                                          //ou que les 50% de chances ont fait que le croupier tente quand même (BONUS)             

                while(sumMainCroupier < 18 || sumMainCroupier <= sumMainUser){  //Boucle qui va faire repiocher le croupier tant que sa main vaut 17 ou moins
                                                                                //ou que sa main est plus petite ou égale à celle du joueur
                    mainCroupier.push(card_list.shift())            
                    sumMainCroupier = sumTable(mainCroupier)
                    console.log("Le croupier pioche, voici sa main " + mainCroupier);

                }
                
                if (sumMainCroupier > sumMainUser && sumMainCroupier <= 21){    //Dans le cas où, après avoir pioché, le croupier gagne
                    console.log("Le croupier gagne ! \nLa somme de sa main est de " + sumMainCroupier + " et la somme de la tienne est de " + sumMainUser);
                }
                else{                                                           //Dernier cas restant, le joueur gagne
                    console.log("Tu as gagné ! \nLa somme de ta main est de " + sumMainUser + " et la somme de celle du croupier est de " + sumMainCroupier);
                }
        
            }
            else if(sumMainCroupier > 17 && sumMainCroupier < sumMainUser && sumMainUser <= 21){  //Dans le cas où, la main du croupier est plus grande que 17 et 
                                                                                                  //que sa main est plus petite que celle du joueur
                console.log("Le croupier concède la victoire, sa main était " + mainCroupier + " , la somme étant équivalente à " + sumMainCroupier);
        
            }
            else if(sumMainCroupier> 21){                                       //Dans le cas où la main du croupier dépasse 21
        
                console.log("Tu as gagné ! \nLa main du croupier était " + mainCroupier);
        
            }
            else if(sumMainCroupier == sumMainUser){                            //Dans le cas où ya une égalité
                console.log("Egalité ! \nLa somme de ta main est de " + sumMainUser + " et celle du croupier est de " + sumMainCroupier);
            }
            
        }
        else if(sumMainUser == 21){         //Dans le cas où le joueur gagne directement sans avoir à piocher
            console.log("Bravo tu as gagné directement ! ALLEZ LE CROUPIER PAYE !");
        }
        else if(sumMainCroupier == 21){     //Dans le cas où le croupier gagne directement sans avoir à piocher
            console.log("Bravo tu as gagné directement ! ALLEZ LE CROUPIER PAYE !");
        }
        else{                               //Dans le cas où ta main est supérieur à 21 sans avoir à piocher
            console.log("Perdu ! La somme de ta main est supérieur à 21.\nSomme de ta main : " + sumMainUser);
        }

        let jouer = prompt("Souhaites-tu relancer une partie ? (oui/non)").toUpperCase()        
        jeuBlockJack(jouer)                 //Appelle de nouveau ma fonction jeu pour relancer une partie (BONUS)

    }else if(play == "NON"){
        alert("Au revoir !");
    }
    else{
        alert("Erreur d'entrée, veuillez rafraichir la page !")     //Dans le cas où la personne n'a pas répondu 'oui' ou 'non'
    }
    
    
}

let jouer = prompt("Bonjour, souhaitez-vous jouer une partie de BlockJack ? (oui/non)").toUpperCase()
jeuBlockJack(jouer)                                     //Lance le jeu