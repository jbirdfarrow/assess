document.write(`<style>
    .book-container-62cc6b044a24130017404e6a {
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 600px;
    }
    
    @keyframes initAnimation-62cc6b044a24130017404e6a {
      0% {
        transform: rotateY(0deg);
      }
      100% {
        transform: rotateY(-30deg);
      }
    }
    
    .book-container-62cc6b044a24130017404e6a .book {
      width: 200px;
      height: 184px;
      position: relative;
      transform-style: preserve-3d;
      transform: rotateY(-30deg);
      transition: transform 1s ease;
      animation: 1s ease 0s 1 initAnimation-62cc6b044a24130017404e6a;
    }
    
    .book-container-62cc6b044a24130017404e6a .book:hover {
      transform: rotateY(0deg);
    }
    
    .book-container-62cc6b044a24130017404e6a .book > :first-child {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 184px;
      transform: translateZ(25px);
      background-color: #01060f;
      border-radius: 0 2px 2px 0;
      box-shadow: 5px 5px 20px #aaaaaa;
      background-color: #01060f;
    }
    
    .book-container-62cc6b044a24130017404e6a .book::before {
      position: absolute;
      content: ' ';
      left: 0;
      top: 3px;
      width: 48px;
      height: 178px;
      transform: translateX(172px) rotateY(90deg);
      background: linear-gradient(90deg, 
        #fff 0%,
        #f9f9f9 5%,
        #fff 10%,
        #f9f9f9 15%,
        #fff 20%,
        #f9f9f9 25%,
        #fff 30%,
        #f9f9f9 35%,
        #fff 40%,
        #f9f9f9 45%,
        #fff 50%,
        #f9f9f9 55%,
        #fff 60%,
        #f9f9f9 65%,
        #fff 70%,
        #f9f9f9 75%,
        #fff 80%,
        #f9f9f9 85%,
        #fff 90%,
        #f9f9f9 95%,
        #fff 100%
        );
    }
    
    .book-container-62cc6b044a24130017404e6a .book::after {
      position: absolute;
      top: 0;
      left: 0;
      content: ' ';
      width: 200px;
      height: 184px;
      transform: translateZ(-25px);
      background-color: #01060f;
      border-radius: 0 2px 2px 0;
      box-shadow: -10px 0 50px 10px #aaaaaa;
    }
  </style>

      <a
        href="https://bluedocs.glide.page"
        target="_blank"
        rel="noopener noreferrer"
      >
        
    <div class="book-container-62cc6b044a24130017404e6a">
      <div class="book">
        <img alt="Blue Community Documentation" src="https://res.cloudinary.com/scastiel/image/upload/v1657564633/ktyapzb0tpzy6fhdslp2.png" />
      </div>
    </div>
  
      </a>
    `)
