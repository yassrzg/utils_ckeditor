<?php

namespace Drupal\utils_ckeditor\Form;

use Drupal\Core\Entity\EntityConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Builds the form to delete Video entities.
 */
class CkeditorVideoSettingsFormDelete extends EntityConfirmFormBase {

  /**
   * Confirm delete form.
   *
   * @return \Drupal\Core\StringTranslation\TranslatableMarkup
   */
  public function getQuestion() {
    return $this->t('Etes-vous sûr de vouloir supprimer %name ?', ['%name' => $this->entity->id()]);
  }

  public function getConfirmText() {
    return $this->t('Delete');
  }

  public function getCancelUrl() {
    return new Url('utils_ckeditor.host_video.display');
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->entity->delete();

    $this->messenger()->addMessage($this->t('%name a été supprimé.', ['%name' => $this->entity->id()]));

    $form_state->setRedirectUrl($this->getCancelUrl());
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $entity = $this->entity;
    $form = parent::buildForm($form, $form_state);
    $form['#title'] = $this->getQuestion();
    $form['#attributes']['class'][] = 'confirmation';
    $form['description'] = [
      '#markup' => $this->t('This action cannot be undone.')
    ];
    $form[$this->getFormName()] = [
      '#type' => 'hidden',
      '#value' => 1,
    ];

    if (!isset($form['#theme'])) {
      $form['#theme'] = 'confirm_form';
    }
    return $form;
  }
}
