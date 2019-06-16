// const SPEED_INDEX = 0
// const MIGHT_INDEX = 1
// const SANITY_INDEX = 2
// const KNOWLEDGE_INDEX = 3
// const STAT_NAMES = ["Speed", "Might", "Sanity", "Knowledge"]
const STATS_TO_INDEX = {
    "Speed": 0,
    "Might": 1,
    "Sanity": 2,
    "Knowledge": 3
}

class Explorer {
    constructor(
        name,
        stat_arrays,
        initial_index_array,
    ) {
        // TODO: make some assertions
        this.name = name
        this.stat_arrays = stat_arrays
        this.initial_index_array = initial_index_array
        this.current_index_array = initial_index_array
   }

   increase_stat(stat_index) {
       if (this.current_index_array[stat_index] < this.stat_arrays[stat_index].length - 1) {
           console.log("increasing")
           this.current_index_array[stat_index] += 1
       }
   }

   decrease_stat(stat_index) {
       if (this.current_index_array[stat_index] > 0) {
           console.log("decreasing")
           this.current_index_array[stat_index] -= 1
       }
   }

   // lower, current, upper
   get_stat_strings(stat_index) {
       var lower = ""
       var current = "" + this.stat_arrays[stat_index][this.current_index_array[stat_index]] + " "
       var upper = ""

       for (var i = 0; i < this.stat_arrays[stat_index].length; i++) {
           if (i < this.current_index_array[stat_index]) {
               lower += this.stat_arrays[stat_index][i] + " "
           } else if (i > this.current_index_array[stat_index]) {
               upper += this.stat_arrays[stat_index][i] + " "
           }
       }

       return {
           lower: lower,
           current: current,
           upper: upper
       }
   }

   get_stat_chunk(stat_index) {
       var stat_strings = this.get_stat_strings(stat_index)
       var lower = document.createElement("span")
       lower.appendChild(document.createTextNode(stat_strings.lower))
       var current = document.createElement("span")
       current.appendChild(document.createTextNode(stat_strings.current))
       current.style.color = "red"
       var upper = document.createElement("span")
       upper.appendChild(document.createTextNode(stat_strings.upper))

       var stat_chunk = document.createElement("div")
       stat_chunk.id = this.name + "-stat-" + stat_index
       stat_chunk.appendChild(lower)
       stat_chunk.appendChild(current)
       stat_chunk.appendChild(upper)

       var decrement_button = document.createElement("button")
       decrement_button.innerHTML = "-"
       var t = this
       decrement_button.addEventListener("click", function() {
           t.decrease_stat(stat_index)
           var current_stat = document.getElementById(t.name + "-stat-" + stat_index)
           current_stat.parentNode.replaceChild(t.get_stat_chunk(stat_index), current_stat)
       })
       stat_chunk.appendChild(decrement_button)

       var increment_button = document.createElement("button")
       increment_button.innerHTML = "+"
       var t = this
       increment_button.addEventListener("click", function() {
           t.increase_stat(stat_index)
           var current_stat = document.getElementById(t.name + "-stat-" + stat_index)
           current_stat.parentNode.replaceChild(t.get_stat_chunk(stat_index), current_stat)
       })

       stat_chunk.appendChild(increment_button)

       return stat_chunk
   }

   get_explorer_div() {
       var div = document.createElement("div")
       var name = document.createElement("p")
       name.style.fontWeight = "bold"
       name.appendChild(document.createTextNode(this.name))
       div.appendChild(name)

       Object.keys(STATS_TO_INDEX).forEach(item => {
           var stat_name = document.createElement("p").appendChild(document.createTextNode(item))
           var stat_chunk = this.get_stat_chunk(STATS_TO_INDEX[item])

           div.appendChild(stat_name)
           div.appendChild(stat_chunk)
       })

       return div
   }
    
}

function create_explorers() {
    var explorers_raw = [
        [
            "Heather Granville",
            [
                ["DEAD", 3, 3, 4, 5, 6, 6, 7, 8],
                ["DEAD", 3, 3, 3, 4, 5, 6, 7, 8],
                ["DEAD", 3, 3, 3, 4, 5, 6, 6, 6],
                ["DEAD", 2, 3, 3, 4, 5, 6, 7, 8]
            ], 
            [3, 3, 3, 5]
        ],
        [
            "Ox Bellows",
            [
                ["DEAD", 2, 2, 2, 3, 4, 5, 5, 6],
                ["DEAD", 4, 5, 5, 6, 6, 7, 8, 8],
                ["DEAD", 2, 2, 3, 4, 5, 5, 6, 7],
                ["DEAD", 2, 2, 3, 3, 5, 5, 6, 6]
            ],
            [5, 3, 3, 3]
        ],
        [
            "Father Rhinehardt",
            [
                ["DEAD", 2, 3, 3, 4, 5, 6, 7, 7],
                ["DEAD", 1, 2, 2, 4, 4, 5, 5, 7],
                ["DEAD", 3, 4, 5, 5, 6, 7, 7, 8],
                ["DEAD", 1, 3, 3, 4, 5, 6, 6, 8]
            ],
            [3, 3, 5, 4]
        ],
        [
            "Peter Akimoto",
            [
                ["DEAD", 3, 3, 3, 4, 6, 6, 7, 7],
                ["DEAD", 2, 3, 3, 4, 5, 5, 6, 8],
                ["DEAD", 3, 4, 4, 4, 5, 6, 6, 7],
                ["DEAD", 3, 4, 4, 5, 6, 7, 7, 8]
            ],
            [4, 3, 4, 3]
        ],
        [
            "Missy Dubourde",
            [
                ["DEAD", 3, 4, 5, 6, 6, 6, 7, 7],
                ["DEAD", 2, 3, 3, 3, 4, 5, 6, 7],
                ["DEAD", 1, 2, 3, 4, 5, 5, 6, 7],
                ["DEAD", 2, 3, 4, 4, 5, 6, 6, 6]
            ],
            [3, 4, 3, 4]
        ],
        [
            "Madame Zostra",
            [
                ["DEAD", 2, 3, 3, 5, 5, 6, 6, 7],
                ["DEAD", 2, 3, 3, 4, 5, 5, 5, 6],
                ["DEAD", 4, 4, 4, 5, 6, 7, 8, 8],
                ["DEAD", 1, 3, 4, 4, 4, 5, 6, 6]
            ],
            [3, 4, 3, 4]
        ],
        [
            "Darrin \"Flash\" Williams",
            [
                ["DEAD", 4, 4, 4, 5, 6, 7, 7, 8],
                ["DEAD", 2, 3, 3, 4, 5, 6, 6, 7],
                ["DEAD", 1, 2, 3, 4, 5, 5, 5, 7],
                ["DEAD", 2, 3, 3, 4, 5, 5, 5, 7]
            ],
            [5, 3, 3, 3]
        ]
    ]

    var explorers_objects = []

    explorers_raw.forEach(item => {
        explorers_objects.push(new Explorer(item[0], item[1], item[2]))
    })

    return explorers_objects
}

var explorers = create_explorers()

explorers.forEach(e => {
    document.body.appendChild(e.get_explorer_div())
    document.body.appendChild(document.createElement("br"))
    document.body.appendChild(document.createElement("br"))
})
