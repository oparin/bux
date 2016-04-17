<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/30/15
 * Time: 1:50 PM
 */

namespace Bux\Admin\UtilitiesBundle\Form\Type\BotSystem;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class GeneralSettingsFormType
 *
 * @package Bux\Admin\UtilitiesBundle\Form\Type\BotSystem
 */
class GeneralSettingsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('clickValue', 'number', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('videoValue', 'number', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('pollValue', 'number', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('rentOption', 'choice', array(
                'choices'   => array(
                    '0' => 'Rent bots only',
                    '1' => 'Rent real members first',
                    '2' => 'Random',
                    '3' => 'Only real members',
                ),
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\UtilitiesBundle\Entity\BotGeneralSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bot_system_general_settings_form_type';
    }
}