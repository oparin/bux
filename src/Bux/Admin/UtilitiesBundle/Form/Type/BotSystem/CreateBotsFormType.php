<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/30/15
 * Time: 4:34 PM
 */

namespace Bux\Admin\UtilitiesBundle\Form\Type\BotSystem;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class CreateBotsFormType
 *
 * @package Bux\Admin\UtilitiesBundle\Form\Type\BotSystem
 */
class CreateBotsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('number', 'number', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bot_system_create_bots_form_type';
    }
}