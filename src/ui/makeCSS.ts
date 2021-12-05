export let makeCSS = `
:root {
    --blue: #0000ff;
    --blue-dark: #18182c;
    --orange: #ffa500;
    --green-yellow: #cddc39;
    --pink-bold: hsl(212, 99%, 66%);
    --pink-medium: hsl(212, 100%, 77%);
    --pink-light: hsl(317, 100%, 94%);
    --white: #f8f8f8;
    --white-alpha-75: rgba(255, 255, 255, 0.6);
    --white-alpha-40: rgba(255, 255, 255, 0.4);
    --white-alpha-25: rgba(255, 255, 255, 0.25);
    --blue-alpha-50: rgba(198, 215, 238, 0.5);
    --backdrop-filter-blur: blur(5px);
}
  
*,
*:before,
*:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body { 
    color: var(--text-muted); 
    background-color: var(--white-alpha-25);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

} 

.item-3,
.item-4,
.item-5 {
	height: 60px;
	display: grid;
	grid-template-rows: 1fr 1fr;
}

.item-3,
.item-6 {
	grid-column: 2/4;
}

.item-4 {
	grid-column: 2/3;
};`;
