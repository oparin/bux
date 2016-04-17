<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/2/15
 * Time: 12:30 PM
 */

namespace Bux\Admin\UtilitiesBundle\Form\Type\BotSystem;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class BotTypesFormType
 *
 * @package Bux\Admin\UtilitiesBundle\Form\Type\BotSystem
 */
class BotTypesFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('minClicks', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('maxClicks', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('minVideo', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('maxVideo', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('minPoll', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('maxPoll', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('daysActivity', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\UtilitiesBundle\Entity\BotType',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bot_system_bot_types_form_type';
    }
} 