<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/19/14
 * Time: 4:16 PM
 */

namespace Bux\Admin\BlogBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class HeaderMenuFormType
 *
 * @package Bux\Admin\BlogBundle\Form\Type
 */
class HeaderMenuFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('visible', 'checkbox', array(
                'required'  => false,
                'attr'      => array(
                    'class' => 'uniform'
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\BlogBundle\Entity\BlogHeaderMenu',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'header_menu_form_type';
    }
} 