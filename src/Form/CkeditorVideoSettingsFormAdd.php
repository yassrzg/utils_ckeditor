<?php

namespace Drupal\utils_ckeditor\Form;

use Drupal\Core\Form\FormStateInterface;

/**
 * Class CkeditorVideoSettingsFormAdd.
 */
class CkeditorVideoSettingsFormAdd extends CkeditorVideoSettingsForm {

/**
 *
 * @param array $form
 * @param FormStateInterface $form_state
 * @return mixed
 */

protected function actions(array $form, FormStateInterface $form_state) {

    $actions = parent::actions($form, $form_state);
    $actions['submit']['#value'] = $this->t('Add');
    return $actions;
  }
}
