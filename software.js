class Timer {
     constructor(root){
          root.innerHTML = Timer.getHyperTextMarkupLanguage();
          this.element = {
               minutes: root.querySelector('.timer__part--minutes'),
               seconds: root.querySelector('.timer__part--seconds'),
               control: root.querySelector('.timer__button--control'),
               reset: root.querySelector('.timer__button--reset'),
          };
          this.interval = null;
          this.remainingSeconds = 0;
          this.element.control.addEventListener('click',() => {
               if(this.interval === null){
                    this.start();
               }else{
                    this.stop();
               }
          });
          this.element.reset.addEventListener('click',() => {
               const inputMinutes = prompt("Enter Number of Minutes");
               if(inputMinutes < 60){
                    this.stop();
                    this.remainingSeconds = inputMinutes * 60;
                    this.updateInterfaceTime();
               }
          });
     }
     updateInterfaceTime(){
          const minutes = Math.floor(this.remainingSeconds / 60);
          const seconds = this.remainingSeconds % 60;
          this.element.minutes.textContent = minutes.toString().padStart(2,'0');
          this.element.seconds.textContent = seconds.toString().padStart(2,'0');
     }
     updateInterfaceControls(){
          if(this.interval === null){
               this.element.control.innerHTML = '<span class="material-icons">play_arrow</span>';
               this.element.control.classList.add('timer__button--start');
               this.element.control.classList.remove('timer__button--stop');
          }else{
               this.element.control.innerHTML = '<span class="material-icons">pause arrow</span>';
               this.element.control.classList.add('timer__button--stop');
               this.element.control.classList.remove('timer__button--start');
          }
     }
     start(){
          if(this.remainingSeconds === 0) return;
          this.interval = setInterval(() => {
               this.remainingSeconds--;
               this.updateInterfaceTime();
               if(this.remainingSeconds === 0){
                    this.stop();
               }
          },1000);
          this.updateInterfaceControls();
     }
     stop(){
          clearInterval(this.interval);
          this.interval = null;
          this.updateInterfaceControls();
     }
     static getHyperTextMarkupLanguage(){
          return `
               <span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
			<button type="button" class="timer__button timer__button--control timer__button--start"><span class="material-icons">play_arrow</span></button>
			<button type="button" class="timer__button timer__button--reset"><span class="material-icons">timer</span></button>
          `;
     }
}
new Timer(document.querySelector('.timer'));