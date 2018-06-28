require_relative("./card_deck")
require("pry")

class Player
  attr_reader(:discard_pile, :score, :deck, :pairs, :name)

  def initialize(name)
    @deck = CardDeck.new([]);
    @score = 0
    @pairs = []
    @name = name
  end

  def play_top_card()
    deck.play_top_card
  end

  def set_score(num)
    @score = num
  end

  def convert_hand(arr_of_cards=nil)
    cards = []
    if arr_of_cards != nil && arr_of_cards != []
      arr_of_cards.each do |card|
        card_str = ("#{card.suit[0, 1].downcase}#{card.rank.to_s.downcase}")
        if card_str[-1] == "1"
          card_str.insert(2, '0')
        end
        cards.push(card_str)
      end
    elsif arr_of_cards == nil
      deck.cards.each do |card_obj|
        card_str = ("#{card_obj.suit[0, 1].downcase}#{card_obj.rank.to_s.downcase}")
        if card_str[-1] == "1"
          card_str.insert(2, '0')
        end
        cards.push(card_str)
      end
    end
    return cards
  end

  def remove_cards(card_rank)
    deck.remove_cards(card_rank)
  end

  def set_deck(arr_of_cards)
    @deck = CardDeck.new(arr_of_cards)
  end

  def add_to_hand(arr_of_cards)
    deck.add(arr_of_cards)
  end

  def card_in_hand(card_rank)
    deck.cards.each do |card_in_deck|
      if card_rank == card_in_deck.rank
        return card_in_deck
      end
    end
    return false
  end

  def set_hand(*cards)
    set_deck(cards)
  end

  def cards_left
    deck.cards_left
  end

  def pair_cards()
    card_holder = []
    deck.cards.each do |card|
      deck.cards.each do |card1|
        if card && card1
          if card.rank == card1.rank
          card_holder.push(card1)
          end
        end
      end
      if card_holder.length == 4
        pairs.push(card_holder[0])
        @score += 1
        card_holder.each do |card|
          deck.delete(card)
        end
      end
      card_holder = []
    end
  end

  def request_cards(player, card_rank, target)
    cards = target.remove_cards(card_rank)
    if cards != []
      player.add_to_hand(cards)
      return cards
    end
    return [false]
  end
end
