<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/11/15
 * Time: 1:54 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class MarketingSettingsFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type
 */
class MarketingSettingsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('membership', 'entity', array(
                'class'         => 'BuxUserBundle:Membership',
                'property'      => 'name',
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('level', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('commission', 'integer', array(
                'constraints'   => array(
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
            'data_class' => 'Bux\Admin\SetupBundle\Entity\MarketingSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'marketing_settings_form_type';
    }
}