import Browser
import Html exposing (Html, button, div, text, span, h3)
import Html.Events exposing (onClick)
import Array

main =
    Browser.sandbox { init = init, update = update, view = view }

-- MODEL

-- explorer name: static
-- explorer stat values: static
-- explorer stat state: dynamic
type alias Explorer =
    { name: string
    , statvalues: Array (Array int)
    , statstates: Array int}

type alias Model = Array Explorer

init : Model
init =
    Array.fromList [
        { name: "explorer1"
        , statvalues: Array.fromList [
            Array.fromList [1, 2, 3, 4, 5],
            Array.fromList [1, 2, 3, 3, 4],
            Array.fromList [1, 1, 1, 3, 3],
            Array.fromList [2, 2, 4, 4, 6]
        ]
        , statstates: Array.fromList [2, 2, 3, 1]}
    ]


-- UPDATE
type Msg = Increment | Decrement

-- splitOnIndex : Int -> List a -> (List a, Maybe a, List a)
-- splitOnIndex index xs =
--     Just ( List.take index xs
--          , List.head (List.drop index xs)
--          , List.drop (index + 1) xs)


adjustStat : Int -> Int -> Explorer -> Explorer
adjustStat adjustAmount statIndex e =
    let
        statsLength =
            case Array.get statIndex e.statvalues of
                Nothing ->
                    Nothing
                Just statList ->
                    Just (Array.length statList)
        
        currentState =
            Array.get statIndex e.statstates
    in
        case (statsLength, currentState) of
            (Nothing, _) ->
                e
            (_, Nothing) ->
                e
            (Just length, Just state) ->
                if (state + adjustAmount) < length && (state + adjustAmount) >= 0 then
                    {e | statstates = Array.set statIndex (state + adjustAmount) e.statstates}
                else
                    e

incrementStat = adjustStat 1
decrementStat = adjustStat -1

update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            case Array.get 0 model of
                Nothing ->
                    model
                Just e ->
                    Array.set 0 (incrementStat 0 e) model
        Decrement ->
            case Array.get 0 model of
                Nothing ->
                    model
                Just e ->
                    Array.set 0 (decrementStat 0 e) model


-- VIEW

arrayToStringSpaces : Array Int -> String
arrayToStringSpaces arr =
    let
        fn el acc =
            acc ++ el ++ " "
    in
        Array.foldl fn "" arr

myRedClass : List (String, String)
myRedClass =
  [ ("color", "red") ]

statArrayAndStateToHTML : Array Int -> Int -> Html Msg
statArrayAndStateToHTML statArray statState =
    let
        lower =
            Array.slice 0 statState statArray
        
        current =
            case (Array.get statState statArray) of
                Just num ->
                    num
                Nothing ->
                    -999
        
        upper =
            Array.slice (statState + 1) (Array.length statArray) statArray
    in
        div []
            [ button [ onClick Decrement ] [ text "-" ]
            , span [] [ text (arrayToStringSpaces lower) ]
            , span [ Html.Attributes.style myRedClass ] [ text (String.fromInt current) ]
            , span [] [ text (arrayToStringSpaces upper) ]
            , button [ onClick Increment ] [ text "+" ]
            ]

explorerDiv : Explorer -> Html Msg
explorerDiv e =


view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (model.name) ]
    , div [] [ text (model.name) ]
    , button [ onClick Increment ] [ text "+" ]
    ]