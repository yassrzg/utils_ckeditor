<?php

namespace Drupal\utils_ckeditor\Form;


use Drupal\Core\Form\FormStateInterface;

/**
 * Class CkeditorVideoSettingsFormEdit.
 */

class CkeditorVideoSettingsFormEdit extends CkeditorVideoSettingsForm {
  protected function actions(array $form,FormStateInterface $form_state) {
    $actions = parent::actions($form, $form_state);
    $actions['submit']['#value'] = $this->t('Edit');
    return $actions;
  }
}
