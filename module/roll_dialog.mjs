export async function attackRollDialog(actor,itemId,data_roll,label){
    let attackDR = 12;
    const item = actor.items.get(itemId);
    const actorRollData = actor.getRollData();
    console.log("label:" + label)
    if (!label){
      label = "Roll"
    }
    
    //const isRanged = itemRollData.weaponType === "ranged";
    //const ability = isRanged ? "presence" : "strength";
    //const attackRoll = new Roll(`d20+diceModifier`, actorRollData);
    const rollFormula = data_roll;

    //await attackRoll.evaluate();
    //await showDice(attackRoll);
    
    const cardTitle = "RollDialog";
    const rollResult = {
        actor,
        rollFormula,
        cardTitle,
        item,
        label
      };
      const html = await renderTemplate(
        "systems/bpnb-borg/templates/dialogs/roll_dialog.hbs",
        rollResult
      );

      return new Promise((resolve) => {
        new Dialog({
          title: "Roll Dialog",
          content: html,
          buttons: {
            roll: {
              icon: '<i class="fas fa-dice-d20"></i>',
              label: game.i18n.localize("BPNB_BORG.RollDialog.Roll"),
              callback: (html) => attackDialogCallback(actor, html),
            },
          },
          default: "roll",
          close: () => resolve(null),
        }).render(true);
      });
}

async function attackDialogCallback(actor, html) {
  const form = html[0].querySelector("form");
  const itemId = form.itemid.value;
  const rollFormula = form.rollFormula.value;
  const rollLabel = form.rollLabel.value;
  const actorRollData = actor.getRollData();

  const attackRoll = new Roll(rollFormula, actorRollData);
  await attackRoll.evaluate();

  attackRoll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: rollLabel,
    rollMode: game.settings.get('core', 'rollMode'),
  });
}