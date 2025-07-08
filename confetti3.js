const 폭죽 = (elementQuery, option) => {
    option = {
        message: "Confetti3",
        수량: 50,
        크기: [5, 15],
        ...option
    }

    const 랜덤 = (...값) => Math.random() * (Math.max(...값) - Math.min(...값)) + Math.min(...값)
    const parent = document.querySelector(elementQuery)
    parent.innerHTML = `
        <div id="confetti" style="position: relative;min-width: 100px;height: 40px;border: 1px solid #ddd;background: #fff;border-radius: 5px;">
            <button style="height: 100%;border: none;background: none;display: flex;justify-content: center;align-items: center;padding: 0 10px;cursor: pointer;gap: 10px;position: relative;z-index: 1;">
                <p style="transform-origin: 0 100%;transition: .1s;">🎉</p>
                <p style="margin-right: 5px;">${option.message}</p>
            </button>
            <article style="position: fixed;inset: 0;"></article>
        </div>
    `
    document.querySelector("head").insertAdjacentHTML("beforeend", `<style>
        @keyframes confetti1 {
            50% {
                --x: 350%;
                --r: 90deg;
            }
            100% {
                --x: -350%;
                --y: 110vh;
            }
        }
        @keyframes confetti2 {
            50% {
                --x: -250%;
                --r: -90deg;
            }
            100% {
                --x: 250%;
                --y: 110vh;
            }
        }
        @keyframes confetti3 {
            50% {
                --x: 100%;
            }
            100% {
                --x: -100%;
                --y: 110vh;
                --r: 45deg;
            }
        }
        @property --x {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
        }

        @property --y {
            syntax: '<length>';
            inherits: false;
            initial-value: 0vh;
        }

        @property --r {
            syntax: '<angle>';
            inherits: false;
            initial-value: 0deg;
        }
    </style>`)

    const button = parent.querySelector("button p:first-child")
    button.addEventListener("transitionend", () => button.style.transform = "none")

    const article = parent.querySelector("article")
    article.addEventListener("animationend", e => e.target.remove())

    const 펑 = () => {
        if(parent.querySelector("article").childElementCount) return

        button.style.transform = "skew(10deg, 10deg)"
        for(let i = 0; i < option.수량; i++) {
            const 크기 = 랜덤(...option.크기)
            article.insertAdjacentHTML("beforeend", `<div style="
                    width: ${크기}px;
                    height: ${크기}px;
                    position: absolute;
                    top: -5vh;
                    left: ${랜덤(0, 100)}%;
                    background: hsl(${Math.round(Math.random() * 360)} 98% 82% / 1);
                    rotate: ${랜덤(-10, 10)}deg;
                    animation: confetti${Math.floor(랜덤(1, 3))} ${랜덤(2, 3)}s ${랜덤(0, 1)}s forwards ease-in-out;
                    transform: translate(var(--x), var(--y)) rotate3d(1, 1, 1, var(--r));
            ">`)
        }
    }

    parent.querySelector("#confetti button").addEventListener("click", 펑)
}
