package com.cpe.springboot.card.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.cpe.springboot.card.model.CardLightModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.user.model.UserModel;

//ONLY FOR TEST NEED ALSO TO ALLOW CROOS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController
public class CardRestController {

	

	@Autowired
	private CardModelService cardModelService;
	
	@RequestMapping("/cards")
	private List<CardLightModel> getAllCards() {
		List<CardLightModel> cLightList=new ArrayList<>();
		for(CardModel c:cardModelService.getAllCardModel()){
			cLightList.add(new CardLightModel(c));
		}
		return cLightList;

	}
	
	@RequestMapping("/card/{id}")
	private CardLightModel getCard(@PathVariable String id) {
		Optional<CardModel> rcard;
		rcard= cardModelService.getCard(Integer.valueOf(id));
		if(rcard.isPresent()) {
			return new CardLightModel(rcard.get());
		}
		return null;

	}
	
	@RequestMapping(method=RequestMethod.POST,value="/card")
	public void addCard(@RequestBody CardModel card) {
		cardModelService.addCard(card);
	}
	
	@RequestMapping(method=RequestMethod.PUT,value="/card/{id}")
	public void updateCard(@RequestBody CardModel card,@PathVariable String id) {
		card.setId(Integer.valueOf(id));
		cardModelService.updateCard(card);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/card/{id}")
	public void deleteUser(@PathVariable String id) {
		cardModelService.deleteCardModel(Integer.valueOf(id));
	}

	@RequestMapping("/cards_to_sell")
	private List<CardLightModel> getCardsToSell() {
		List<CardLightModel> list=new ArrayList<>();
		for( CardModel c : cardModelService.getAllCardToSell()){
			CardLightModel cLight=new CardLightModel(c);
			list.add(cLight);
		}
		return list;

	}
	
}
